"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var HotSeatSchema = new mongoose_1.Schema({
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
        },
    ],
});
var HotSeat = mongoose_1.models.HotSeat || (0, mongoose_1.model)('HotSeat', HotSeatSchema);
exports.default = HotSeat;
