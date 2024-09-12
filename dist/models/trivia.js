"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TriviaQuestionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    rightAnswer: { type: String, required: true },
    falseAnswer1: { type: String, required: true },
    falseAnswer2: { type: String, required: true },
    falseAnswer3: { type: String, required: true },
});
var TriviaSchema = new mongoose_1.Schema({
    questions: {
        type: [TriviaQuestionSchema],
        required: true,
    },
});
var Trivia = mongoose_1.models.Trivia || (0, mongoose_1.model)('Trivia', TriviaSchema);
exports.default = Trivia;
