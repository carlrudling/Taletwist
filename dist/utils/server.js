"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
// Object to track completed statements for each room
var roomStatements = {};
var playerCounts = {}; // To track the number of players in each room
var roomData = {};
var roomResponses = {}; // Define the type for roomResponses
io.on('connection', function (socket) {
    console.log('User connected:', socket.id);
    // Handle joining a room
    socket.on('joinRoom', function (_a, callback) {
        var roomId = _a.roomId, role = _a.role, name = _a.name;
        var existingCreator = Array.from(io.sockets.adapter.rooms.get(roomId) || []).find(function (socketId) {
            var socketInRoom = io.sockets.sockets.get(socketId);
            return (socketInRoom === null || socketInRoom === void 0 ? void 0 : socketInRoom.data.role) === 'creator';
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
            console.log("Player with ID: ".concat(socket.id, " and Name: ").concat(name, " joined room: ").concat(roomId));
            if (!roomData[roomId]) {
                roomData[roomId] = { players: [], playerCount: 0 };
            }
            roomData[roomId].players.push(socket.id);
            roomData[roomId].playerCount += 1;
        }
        else {
            console.log("Creator with ID: ".concat(socket.id, " joined room: ").concat(roomId));
        }
        io.to(roomId).emit('userJoined', { userId: socket.id, role: role, name: role === 'player' ? name : null }); // Include name only for players
        callback({ success: true });
    });
    //--------------------------------------------------------------------
    //  GUESS WHO EVENTS
    //--------------------------------------------------------------------
    // Handle starting Guess Who game
    socket.on('startGuessWhoGame', function (_a) {
        var _b;
        var roomId = _a.roomId, questions = _a.questions;
        if (socket.data.role !== 'creator') {
            console.log('Only the creator can start the game');
            return;
        }
        console.log("Starting Guess Who game in room ".concat(roomId));
        if (!Array.isArray(questions)) {
            console.error('Received questions is not an array:', questions);
            return;
        }
        var players = ((_b = roomData[roomId]) === null || _b === void 0 ? void 0 : _b.players) || [];
        var numPlayers = players.length;
        var totalQuestionsNeeded = numPlayers * 3; // Each player needs 3 questions
        var questionPool = __spreadArray([], questions, true); // Create a pool of questions
        // Duplicate questions if there are not enough
        while (questionPool.length < totalQuestionsNeeded) {
            var extraQuestions = __spreadArray([], questions, true); // Duplicate the original questions
            questionPool = questionPool.concat(extraQuestions);
        }
        // Shuffle the question pool to randomize assignment
        var shuffledQuestions = questionPool.sort(function () { return Math.random() - 0.5; });
        // Assign 3 questions to each player
        players.forEach(function (playerSocketId, index) {
            var start = index * 3;
            var playerQuestions = shuffledQuestions.slice(start, start + 3);
            io.to(playerSocketId).emit('startGuessWhoGame', playerQuestions);
        });
    });
    // Handle receiving completed answers
    socket.on('submitGuessWhoAnswers', function (completedStatement) {
        var _a;
        console.log('Received completed statement:', completedStatement);
        var roomId = Array.from(socket.rooms).find(function (room) { return room !== socket.id; }); // Get the room ID
        if (!roomId) {
            return;
        }
        // Initialize the room in the roomStatements object if it doesn't exist
        if (!roomStatements[roomId]) {
            roomStatements[roomId] = [];
        }
        // Add the received statement to the room's array of statements
        roomStatements[roomId].push(completedStatement);
        var totalExpectedStatements = ((_a = roomData[roomId]) === null || _a === void 0 ? void 0 : _a.playerCount) * 3; // Adjusted to account for the number of players
        // Check if all statements have been received
        if (roomStatements[roomId].length === totalExpectedStatements) {
            console.log("All statements received for room ".concat(roomId, ". Emitting final statements."));
            // Find the creator in the room
            var creatorSocketId = Array.from(io.sockets.adapter.rooms.get(roomId) || []).find(function (socketId) {
                var socket = io.sockets.sockets.get(socketId);
                return (socket === null || socket === void 0 ? void 0 : socket.data.role) === 'creator';
            });
            // Emit the event with all completed statements to the creator only
            if (creatorSocketId) {
                io.to(creatorSocketId).emit('allStatementsReceived', roomStatements[roomId]);
            }
            // Notify all players to move to the next page (QuestionGuessPage)
            Array.from(io.sockets.adapter.rooms.get(roomId) || []).forEach(function (socketId) {
                var playerSocket = io.sockets.sockets.get(socketId);
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
    socket.on('newQuestion', function (newQuestion) {
        console.log('Received new question from creator:', newQuestion);
        var roomId = Array.from(socket.rooms).find(function (room) { return room !== socket.id; });
        if (!roomId) {
            console.error('Room not found for newQuestion');
            return;
        }
        // Get all sockets in the room and filter only players (exclude the creator)
        var roomPlayers = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(function (socketId) {
            var playerSocket = io.sockets.sockets.get(socketId);
            return playerSocket && playerSocket.data.role === 'player'; // Ensure the socket is a player
        });
        if (roomPlayers.length === 0) {
            console.log('No players found in the room to send the question to.');
            return;
        }
        console.log("Broadcasting new question to players in room: ".concat(roomId));
        console.log("Room players: ".concat(JSON.stringify(roomPlayers)));
        // Emit the new question to all players in the room
        roomPlayers.forEach(function (playerSocketId) {
            // Modify the emitted event to include the color mapping
            var questionData = {
                statement: newQuestion.statement,
                correctAnswer: newQuestion.correctAnswer,
                options: newQuestion.options, // Randomized options
                colorMapping: newQuestion.colors // Pass the color mapping for each answer
            };
            io.to(playerSocketId).emit('newQuestion', questionData);
            console.log("Emitting newQuestion with colors to player: ".concat(playerSocketId));
        });
    });
    // Listen for the 'currentScore' event
    // Listen for the 'currentScore' event
    socket.on('currentScore', function (_a) {
        var currentScore = _a.currentScore, correct = _a.correct, answer = _a.answer, position = _a.position;
        console.log("Player ".concat(socket.id, " has a score of ").concat(currentScore, ", answered ").concat(answer, " at position ").concat(position, ", and was ").concat(correct ? 'correct' : 'incorrect'));
        var roomId = Array.from(socket.rooms).find(function (room) { return room !== socket.id; }); // Find the room
        if (!roomId) {
            console.log('No room found for the player.');
            return;
        }
        console.log("Room ID: ".concat(roomId));
        // Initialize roomResponses[roomId] as an empty array if it doesn't exist
        if (!roomResponses[roomId]) {
            roomResponses[roomId] = [];
        }
        // Get player's name (assuming it's stored in socket.data)
        var playerName = socket.data.name || 'Unknown';
        console.log("Player name: ".concat(playerName));
        // Store the player's response, including the answer position
        roomResponses[roomId] = roomResponses[roomId].filter(function (r) { return r.playerId !== socket.id; }); // Remove previous entry if exists
        roomResponses[roomId].push({ playerId: socket.id, playerName: playerName, currentScore: currentScore, correct: correct, answer: answer, position: position }); // Include the answer and position
        console.log("Updated roomResponses for ".concat(roomId, ":"), roomResponses[roomId]);
        // Check if all players (not the creator) have responded
        var totalPlayersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(function (socketId) {
            var socketInRoom = io.sockets.sockets.get(socketId);
            return (socketInRoom === null || socketInRoom === void 0 ? void 0 : socketInRoom.data.role) === 'player'; // Only count players
        }).length;
        console.log("Player count in room ".concat(roomId, ": ").concat(totalPlayersInRoom));
        console.log("Responses received: ".concat(roomResponses[roomId].length));
        // If all players have responded
        if (roomResponses[roomId].length === totalPlayersInRoom) {
            console.log("All players have responded in room ".concat(roomId));
            // Emit the collected responses to everyone in the room (including the creator and all players)
            io.in(roomId).emit('allPlayersAnswered', roomResponses[roomId]);
            // Optionally, clear roomResponses for the next question
            roomResponses[roomId] = [];
        }
    });
    socket.on('timeUp', function () {
        // Find the room the socket is part of
        var roomId = Array.from(socket.rooms).find(function (room) { return room !== socket.id; }); // Avoid the socket's own room ID
        if (roomId) {
            console.log("Time is up for room: ".concat(roomId));
            // Broadcast the "timeUp" event to all players in the room
            io.to(roomId).emit('timeUp');
        }
        else {
            console.error('Room not found for timeUp event');
        }
    });
    //--------------------------------------------------------------------
    socket.on('disconnect', function () {
        console.log('User disconnected:', socket.id);
        var roomId = Array.from(socket.rooms).find(function (room) { return room !== socket.id; }); // Get the room ID
        if (roomId && roomData[roomId]) {
            // Remove the player from the room if they disconnect
            if (socket.data.role === 'player') {
                roomData[roomId].players = roomData[roomId].players.filter(function (id) { return id !== socket.id; });
                roomData[roomId].playerCount -= 1;
            }
            // If no players left in the room, delete the room data
            if (roomData[roomId].playerCount === 0) {
                delete roomData[roomId];
            }
        }
    });
});
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log("Socket.IO server running on port ".concat(PORT));
});
