"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// category.ts
var CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, enum: ['user', 'taletwist'], required: true },
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: {
        type: {
            count: { type: Number, default: 0 },
            userIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User', default: [] },
        },
        default: { count: 0, userIds: [] },
    },
    isPrivate: { type: Boolean, default: false },
    gameType: {
        name: { type: String, enum: ['GuessWho', 'HotSeat', 'Trivia', 'MostLikely'], required: true },
        id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    },
    tags: { type: [String], default: [] },
    reports: [
        {
            cause: { type: String, enum: ['Harassment', 'Hate Speech', 'Inappropriate Content', 'Spam', 'Other'], required: true },
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            comment: { type: String },
        },
    ],
    questionCount: { type: Number, default: 0, required: true }, // Ensure this field is correctly defined
});
// Method to check if a user has already voted
CategorySchema.methods.hasVoted = function (userId) {
    var _a, _b;
    return (_b = (_a = this.votes) === null || _a === void 0 ? void 0 : _a.userIds.includes(userId)) !== null && _b !== void 0 ? _b : false;
};
// Method to add a vote
CategorySchema.methods.addVote = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!this.hasVoted(userId)) return [3 /*break*/, 2];
                    this.votes.userIds.push(userId);
                    this.votes.count += 1;
                    return [4 /*yield*/, this.save()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: throw new Error('User has already voted');
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Method to add a report
CategorySchema.methods.addReport = function (userId, cause, comment) {
    return __awaiter(this, void 0, void 0, function () {
        var hasReported;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.reports) {
                        this.reports = [];
                    }
                    hasReported = this.reports.some(function (report) {
                        return report.userId.equals(userId) && report.cause === cause;
                    });
                    if (!!hasReported) return [3 /*break*/, 2];
                    this.reports.push({ userId: userId, cause: cause, comment: comment });
                    return [4 /*yield*/, this.save()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: throw new Error('User has already reported this category for the same reason');
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Method to add a tag (Optional)
CategorySchema.methods.addTag = function (tag) {
    if (!this.tags.includes(tag)) {
        this.tags.push(tag);
        this.save();
    }
};
// Method to remove a tag (Optional)
CategorySchema.methods.removeTag = function (tag) {
    this.tags = this.tags.filter(function (t) { return t !== tag; });
    this.save();
};
var Category = mongoose_1.models.Category || (0, mongoose_1.model)('Category', CategorySchema);
exports.default = Category;
