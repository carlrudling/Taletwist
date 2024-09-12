"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/player.ts
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
var Player = mongoose_1.models.Player || (0, mongoose_1.model)('Player', PlayerSchema);
exports.default = Player;
