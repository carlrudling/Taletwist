"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MostLikelySchema = new mongoose_1.Schema({
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
        },
    ],
});
var MostLikely = mongoose_1.models.MostLikely || (0, mongoose_1.model)('MostLikely', MostLikelySchema);
exports.default = MostLikely;
