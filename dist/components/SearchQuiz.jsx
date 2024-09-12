"use strict";
'use client';
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
var react_1 = require("react");
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var SearchQuiz = function (_a) {
    var socket = _a.socket, onNavigate = _a.onNavigate, user = _a.user, handlePlayerName = _a.handlePlayerName;
    var _b = (0, react_1.useState)(''), quizCode = _b[0], setQuizCode = _b[1];
    var _c = (0, react_1.useState)(''), playerName = _c[0], setPlayerName = _c[1];
    var _d = (0, react_1.useState)(''), message = _d[0], setMessage = _d[1];
    var setSelectedQuiz = (0, QuizProvider_1.useQuizContext)().setSelectedQuiz;
    var handleJoinQuiz = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var createPlayerResponse, playerData, addPlayerResponse, errorData, quizData, role, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log('Joining quiz with code:', quizCode, 'as', playerName);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, fetch('/api/players', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: playerName }),
                        })];
                case 2:
                    createPlayerResponse = _a.sent();
                    if (!createPlayerResponse.ok) {
                        throw new Error('Failed to create player');
                    }
                    return [4 /*yield*/, createPlayerResponse.json()];
                case 3:
                    playerData = _a.sent();
                    console.log('Player created:', playerData);
                    return [4 /*yield*/, fetch("/api/quizzes/joinCode/".concat(quizCode), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: playerName, score: 0, wins: 0 }), // Additional player details can be added here
                        })];
                case 4:
                    addPlayerResponse = _a.sent();
                    if (!!addPlayerResponse.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, addPlayerResponse.json()];
                case 5:
                    errorData = _a.sent();
                    throw new Error(errorData.message || 'Failed to join the quiz');
                case 6: return [4 /*yield*/, addPlayerResponse.json()];
                case 7:
                    quizData = _a.sent();
                    console.log('Joined quiz successfully:', quizData);
                    setMessage('Joined quiz successfully!');
                    setSelectedQuiz(quizData.data); // Set the selected quiz in the context
                    if (socket && socket.connected) {
                        console.log('Socket is connected, emitting joinRoom');
                        role = 'player';
                        socket.emit('joinRoom', { roomId: quizCode, role: role, name: playerName }, function (response) {
                            if (response.success) {
                                console.log('Successfully joined the room as player');
                                handlePlayerName(playerName); // Set player name globally if necessary
                                onNavigate('joinQuizResponse'); // Navigate to the next page
                            }
                            else {
                                console.error('Failed to join room as player:', response.message);
                                setMessage('Failed to join the room. Please try again.');
                            }
                        });
                    }
                    else {
                        console.log('Socket not connected');
                        setMessage('Unable to connect to the server. Please try again.');
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Failed to join quiz:', error_1.message);
                    setMessage(error_1.message);
                    return [3 /*break*/, 9];
                case 9:
                    setQuizCode('');
                    setPlayerName('');
                    return [2 /*return*/];
            }
        });
    }); };
    var handlePlayerNameChange = function (event) {
        setPlayerName(event.target.value);
    };
    var handleQuizCodeChange = function (event) {
        setQuizCode(event.target.value);
    };
    return (<section className='feed'>
      <form className='z-20 relative w-full flex justify-center items-center flex-col gap-4' onSubmit={handleJoinQuiz}>
        <input type='text' placeholder='Code for the quiz' value={quizCode} onChange={handleQuizCodeChange} required className='search_input'/>
        {quizCode.length >= 8 && (<input type='text' placeholder='Name' value={playerName} onChange={handlePlayerNameChange} required className='search_input'/>)}
        <button type='submit' className='join_btn' disabled={quizCode.length < 8 || !playerName}>
          Join
        </button>
      </form>
      {message && <p className='text-red-500'>{message}</p>}
    </section>);
};
exports.default = SearchQuiz;
