"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/quiz.ts
var mongoose_1 = require("mongoose");
var PlayerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
});
var QuizSchema = new mongoose_1.Schema({
    joinCode: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now, // Default to the current date
    },
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    players: {
        type: [PlayerSchema],
        default: [],
        validate: {
            validator: function (players) {
                var names = players.map(function (player) { return player.name; });
                return names.length === new Set(names).size;
            },
            message: 'Player names must be unique within the quiz.',
        },
    },
});
var Quiz = mongoose_1.models.Quiz || (0, mongoose_1.model)('Quiz', QuizSchema);
exports.default = Quiz;
