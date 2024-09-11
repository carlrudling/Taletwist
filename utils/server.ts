import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { IGameStatement } from './IGameStatement';


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  }
});

interface RoomData {
  players: string[];
  playerCount: number;
}

interface PlayerResponse {
  playerId: string;
  playerName?: string; // Player name is optional (only for players)
  currentScore: number;
  correct: boolean;
  answer?: string;      // Optional answer string
  position?: string;    // Add the position field to track the answer position
}



// Object to track completed statements for each room
const roomStatements: { [roomId: string]: IGameStatement[] } = {};
const playerCounts: { [roomId: string]: number } = {}; // To track the number of players in each room
const roomData: { [roomId: string]: RoomData } = {};
const roomResponses: { [roomId: string]: PlayerResponse[] } = {}; // Define the type for roomResponses


io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  // Handle joining a room
socket.on('joinRoom', ({ roomId, role, name }: { roomId: string, role: 'creator' | 'player', name?: string }, callback) => {
  const existingCreator = Array.from(io.sockets.adapter.rooms.get(roomId) || []).find(socketId => {
    const socketInRoom = io.sockets.sockets.get(socketId);
    return socketInRoom?.data.role === 'creator';
  });

  if (role === 'creator' && existingCreator) {
    console.log('A creator already exists in room:', roomId);
    callback({ success: false, message: 'A creator already exists in this room.' });
    return;
  }

  socket.join(roomId);
  socket.data.role = role;

  // Store player's name only if the role is 'player'
  if (role === 'player') {
    socket.data.name = name;
    console.log(`Player with ID: ${socket.id} and Name: ${name} joined room: ${roomId}`);
    if (!roomData[roomId]) {
      roomData[roomId] = { players: [], playerCount: 0 };
    }
    roomData[roomId].players.push(socket.id);
    
    roomData[roomId].playerCount += 1;
  } else {
    console.log(`Creator with ID: ${socket.id} joined room: ${roomId}`);
  }

  io.to(roomId).emit('userJoined', { userId: socket.id, role, name: role === 'player' ? name : null }); // Include name only for players
  callback({ success: true });
});


//--------------------------------------------------------------------
//  GUESS WHO EVENTS
//--------------------------------------------------------------------

 // Handle starting Guess Who game
socket.on('startGuessWhoGame', ({ roomId, questions }: { roomId: string, questions: IGameStatement[] }) => {
  if (socket.data.role !== 'creator') {
    console.log('Only the creator can start the game');
    return;
  }

  console.log(`Starting Guess Who game in room ${roomId}`);

  if (!Array.isArray(questions)) {
    console.error('Received questions is not an array:', questions);
    return;
  }

  const players = roomData[roomId]?.players || [];
  const numPlayers = players.length;
  const totalQuestionsNeeded = numPlayers * 3; // Each player needs 3 questions

  let questionPool = [...questions]; // Create a pool of questions

  // Duplicate questions if there are not enough
  while (questionPool.length < totalQuestionsNeeded) {
    const extraQuestions = [...questions]; // Duplicate the original questions
    questionPool = questionPool.concat(extraQuestions);
  }

  // Shuffle the question pool to randomize assignment
  const shuffledQuestions = questionPool.sort(() => Math.random() - 0.5);

  // Assign 3 questions to each player
  players.forEach((playerSocketId, index) => {
    const start = index * 3;
    const playerQuestions = shuffledQuestions.slice(start, start + 3);
    io.to(playerSocketId).emit('startGuessWhoGame', playerQuestions);
  });
});

// Handle receiving completed answers
socket.on('submitGuessWhoAnswers', (completedStatement: IGameStatement) => {
  console.log('Received completed statement:', completedStatement);

  const roomId = Array.from(socket.rooms).find(room => room !== socket.id); // Get the room ID
  if (!roomId) {
    return;
  }

  // Initialize the room in the roomStatements object if it doesn't exist
  if (!roomStatements[roomId]) {
    roomStatements[roomId] = [];
  }

  // Add the received statement to the room's array of statements
  roomStatements[roomId].push(completedStatement);

  const totalExpectedStatements = roomData[roomId]?.playerCount * 3; // Adjusted to account for the number of players

  // Check if all statements have been received
  if (roomStatements[roomId].length === totalExpectedStatements) {
    console.log(`All statements received for room ${roomId}. Emitting final statements.`);

    // Find the creator in the room
    const creatorSocketId = Array.from(io.sockets.adapter.rooms.get(roomId) || []).find(socketId => {
      const socket = io.sockets.sockets.get(socketId);
      return socket?.data.role === 'creator';
    });

    // Emit the event with all completed statements to the creator only
    if (creatorSocketId) {
      io.to(creatorSocketId).emit('allStatementsReceived', roomStatements[roomId]);
    }

    // Notify all players to move to the next page (QuestionGuessPage)
    Array.from(io.sockets.adapter.rooms.get(roomId) || []).forEach(socketId => {
      const playerSocket = io.sockets.sockets.get(socketId);
      if (playerSocket && playerSocket.data.role === 'player') {
        io.to(socketId).emit('QuestionGuessPage');
      }
    });

    // Optionally, clear the stored statements and player count for this room
    delete roomStatements[roomId];
    delete roomData[roomId];
  }
});


// Handle the new question event from the creator
socket.on('newQuestion', (newQuestion) => {
  console.log('Received new question from creator:', newQuestion);

  const roomId = Array.from(socket.rooms).find(room => room !== socket.id);
  if (!roomId) {
    console.error('Room not found for newQuestion');
    return;
  }

  // Get all sockets in the room and filter only players (exclude the creator)
  const roomPlayers = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(socketId => {
    const playerSocket = io.sockets.sockets.get(socketId);
    return playerSocket && playerSocket.data.role === 'player';  // Ensure the socket is a player
  });

  if (roomPlayers.length === 0) {
    console.log('No players found in the room to send the question to.');
    return;
  }

  console.log(`Broadcasting new question to players in room: ${roomId}`);
  console.log(`Room players: ${JSON.stringify(roomPlayers)}`);

  // Emit the new question to all players in the room
  roomPlayers.forEach(playerSocketId => {
    // Modify the emitted event to include the color mapping
    const questionData = {
      statement: newQuestion.statement,
      correctAnswer: newQuestion.correctAnswer,
      options: newQuestion.options,   // Randomized options
      colorMapping: newQuestion.colors // Pass the color mapping for each answer
    };

    io.to(playerSocketId).emit('newQuestion', questionData);
    console.log(`Emitting newQuestion with colors to player: ${playerSocketId}`);
  });
});



// Listen for the 'currentScore' event
// Listen for the 'currentScore' event
socket.on('currentScore', ({ currentScore, correct, answer, position }) => {
  console.log(`Player ${socket.id} has a score of ${currentScore}, answered ${answer} at position ${position}, and was ${correct ? 'correct' : 'incorrect'}`);

  const roomId = Array.from(socket.rooms).find(room => room !== socket.id); // Find the room

  if (!roomId) {
    console.log('No room found for the player.');
    return;
  }
  console.log(`Room ID: ${roomId}`);

  // Initialize roomResponses[roomId] as an empty array if it doesn't exist
  if (!roomResponses[roomId]) {
    roomResponses[roomId] = [];
  }

  // Get player's name (assuming it's stored in socket.data)
  const playerName = socket.data.name || 'Unknown';
  console.log(`Player name: ${playerName}`);

  // Store the player's response, including the answer position
  roomResponses[roomId] = roomResponses[roomId].filter(r => r.playerId !== socket.id); // Remove previous entry if exists
  roomResponses[roomId].push({ playerId: socket.id, playerName, currentScore, correct, answer, position }); // Include the answer and position

  console.log(`Updated roomResponses for ${roomId}:`, roomResponses[roomId]);

  // Check if all players (not the creator) have responded
  const totalPlayersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(socketId => {
    const socketInRoom = io.sockets.sockets.get(socketId);
    return socketInRoom?.data.role === 'player';  // Only count players
  }).length;

  console.log(`Player count in room ${roomId}: ${totalPlayersInRoom}`);
  console.log(`Responses received: ${roomResponses[roomId].length}`);

  // If all players have responded
  if (roomResponses[roomId].length === totalPlayersInRoom) {
    console.log(`All players have responded in room ${roomId}`);

    // Emit the collected responses to everyone in the room (including the creator and all players)
    io.in(roomId).emit('allPlayersAnswered', roomResponses[roomId]);

    // Optionally, clear roomResponses for the next question
    roomResponses[roomId] = [];
  }
});







  socket.on('timeUp', () => {
  // Find the room the socket is part of
  const roomId = Array.from(socket.rooms).find(room => room !== socket.id); // Avoid the socket's own room ID

  if (roomId) {
    console.log(`Time is up for room: ${roomId}`);
    // Broadcast the "timeUp" event to all players in the room
    io.to(roomId).emit('timeUp');
  } else {
    console.error('Room not found for timeUp event');
  }
});

//--------------------------------------------------------------------

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const roomId = Array.from(socket.rooms).find(room => room !== socket.id); // Get the room ID

    if (roomId && roomData[roomId]) {
      // Remove the player from the room if they disconnect
      if (socket.data.role === 'player') {
        roomData[roomId].players = roomData[roomId].players.filter(id => id !== socket.id);
        roomData[roomId].playerCount -= 1;
      }

      // If no players left in the room, delete the room data
      if (roomData[roomId].playerCount === 0) {
        delete roomData[roomId];
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});


