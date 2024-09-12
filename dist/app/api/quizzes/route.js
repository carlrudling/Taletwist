"use strict";
// app/api/quizzes/route.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DELETE = DELETE;
var server_1 = require("next/server"); // Use NextResponse for API routes in the app directory
var database_1 = __importDefault(require("@/utils/database"));
var quiz_1 = __importDefault(require("@/models/quiz"));
var generateJoinCode_1 = require("@/utils/generateJoinCode");
// Connect to the database
(0, database_1.default)();
// Handle POST request to create a new quiz
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, quiz, joinCode, isUnique, error_1, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Handling POST request');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _b.sent();
                    // Ensure the required fields are present
                    if (!body.creatorId || !body.name) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Creator ID and quiz name are required' }, { status: 400 })];
                    }
                    quiz = void 0;
                    joinCode = void 0;
                    isUnique = false;
                    _b.label = 3;
                case 3:
                    if (!!isUnique) return [3 /*break*/, 8];
                    joinCode = (0, generateJoinCode_1.generateJoinCode)();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, quiz_1.default.create(__assign(__assign({}, body), { joinCode: joinCode }))];
                case 5:
                    // Attempt to create the quiz
                    quiz = _b.sent();
                    // If successful, exit the loop
                    isUnique = true;
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    // If a duplicate key error occurs, try again
                    if (error_1.code === 11000 && ((_a = error_1.keyPattern) === null || _a === void 0 ? void 0 : _a.joinCode)) {
                        console.log('Duplicate join code, retrying...');
                    }
                    else {
                        console.error('Error creating quiz:', error_1);
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error creating quiz' }, { status: 400 })];
                    }
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 3];
                case 8: 
                // If successful, return the created quiz
                return [2 /*return*/, server_1.NextResponse.json({ success: true, data: quiz }, { status: 201 })];
                case 9:
                    error_2 = _b.sent();
                    console.error('Error creating quiz:', error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error creating quiz' }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Handle DELETE request to delete expired quizzes
function DELETE(req) {
    return __awaiter(this, void 0, void 0, function () {
        var expirationTime, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Handling DELETE request');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    expirationTime = new Date();
                    expirationTime.setHours(expirationTime.getHours() - 5);
                    return [4 /*yield*/, quiz_1.default.deleteMany({ createdDate: { $lte: expirationTime } })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, message: "Deleted ".concat(result.deletedCount, " expired quizzes") }, { status: 200 })];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error deleting expired quizzes:', error_3);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error deleting expired quizzes' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
