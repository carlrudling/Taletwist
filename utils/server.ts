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

// Object to track completed statements for each room
const roomStatements: { [roomId: string]: IGameStatement[] } = {};
const playerCounts: { [roomId: string]: number } = {}; // To track the number of players in each room


io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  // Handle joining a room
   // Handle joining a room
  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);

    // Track the number of players in the room
    if (!playerCounts[roomId]) {
      playerCounts[roomId] = 0;
    }
    playerCounts[roomId] += 1;

    io.to(roomId).emit('userJoined', `User ${socket.id} has joined the room.`);
  });

 // Handle starting Guess Who game
socket.on('startGuessWhoGame', ({ roomId, questions }: { roomId: string, questions: IGameStatement[] }) => {
  console.log(`Starting Guess Who game in room ${roomId}`);

  if (!Array.isArray(questions)) {
    console.error('Received questions is not an array:', questions);
    return;
  }

  // Shuffle the questions array to randomize question assignment
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  // Get all sockets in the room
  const players = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

  // Assign 3 unique questions to each player
  players.forEach((playerSocketId, index) => {
    const playerQuestions = shuffledQuestions.slice(index * 3, index * 3 + 3);
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

    const totalExpectedStatements = playerCounts[roomId] * 3;

    // Check if all statements have been received
    if (roomStatements[roomId].length === totalExpectedStatements) {
      console.log(`All statements received for room ${roomId}. Emitting final statements.`);

      // Emit the event with all completed statements
      io.to(roomId).emit('allStatementsReceived', roomStatements[roomId]);

      // Optionally, clear the stored statements and player count for this room
      delete roomStatements[roomId];
      delete playerCounts[roomId];
    }
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});





