"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserMessageSchema = new mongoose_1.Schema({
    subject: {
        type: String,
        enum: ['newFeature', 'bug', 'other'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
var UserMessage = mongoose_1.models.UserMessage || (0, mongoose_1.model)('UserMessage', UserMessageSchema);
exports.default = UserMessage;
