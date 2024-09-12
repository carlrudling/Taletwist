"use strict";
// app/api/quizzes/joinCode/[joinCode]/route.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
var server_1 = require("next/server");
var database_1 = __importDefault(require("@/utils/database"));
var quiz_1 = __importDefault(require("@/models/quiz"));
// Ensure the database is connected
(0, database_1.default)();
// Define the POST handler for adding a player to a quiz by joinCode
function POST(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var _c, name_1, _d, score, _e, wins, joinCode, quiz, existingPlayer, newPlayer, error_1;
        var params = _b.params;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _c = _f.sent(), name_1 = _c.name, _d = _c.score, score = _d === void 0 ? 0 : _d, _e = _c.wins, wins = _e === void 0 ? 0 : _e;
                    // Validate player name
                    if (!name_1) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Player name is required' }, { status: 400 })];
                    }
                    joinCode = params.joinCode;
                    return [4 /*yield*/, quiz_1.default.findOne({ joinCode: joinCode })];
                case 2:
                    quiz = _f.sent();
                    if (!quiz) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 })];
                    }
                    existingPlayer = quiz.players.find(function (player) { return player.name === name_1; });
                    if (existingPlayer) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Player name already exists in the quiz' }, { status: 400 })];
                    }
                    newPlayer = { name: name_1, score: score, wins: wins };
                    // Add the player to the quiz's players array
                    quiz.players.push(newPlayer);
                    // Save the updated quiz document
                    return [4 /*yield*/, quiz.save()];
                case 3:
                    // Save the updated quiz document
                    _f.sent();
                    // Return a success response
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, data: quiz }, { status: 200 })];
                case 4:
                    error_1 = _f.sent();
                    console.error('Error adding player to quiz:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error adding player to quiz' }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
