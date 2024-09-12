"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var GuessWhoSchema = new mongoose_1.Schema({
    statements: [
        {
            statement: {
                type: String,
                required: true,
            },
        },
    ],
});
var GuessWho = mongoose_1.models.GuessWho || (0, mongoose_1.model)('GuessWho', GuessWhoSchema);
exports.default = GuessWho;
