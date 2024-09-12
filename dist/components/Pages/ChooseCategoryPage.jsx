"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var react_1 = __importStar(require("react"));
var blueShape_1 = __importDefault(require("../icons/blueShape"));
var SearchCategory_1 = __importDefault(require("../SearchCategory"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var ChooseCategoryPage = function (_a) {
    var _b;
    var onNavigate = _a.onNavigate, user = _a.user, gameType = _a.gameType, socket = _a.socket;
    var _c = (0, react_1.useState)([]), categories = _c[0], setCategories = _c[1];
    var _d = (0, react_1.useState)(null), pressedCategory = _d[0], setPressedCategory = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    (0, react_1.useEffect)(function () {
        var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!gameType)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        setLoading(true);
                        return [4 /*yield*/, fetch("/api/categories/game/".concat(encodeURIComponent(gameType)))];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to fetch categories');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        setCategories(data.data);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        setError(err_1.message);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchCategories();
    }, [gameType]);
    var handlePress = function (categoryId) {
        setPressedCategory(categoryId);
    };
    var handleStartGame = function () { return __awaiter(void 0, void 0, void 0, function () {
        var selectedCategory, response, fetchedData, fetchedStatements, questions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(gameType && socket && pressedCategory && selectedQuiz)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    selectedCategory = categories.find(function (category) { return category._id === pressedCategory; });
                    if (!selectedCategory) {
                        throw new Error('Category not found');
                    }
                    return [4 /*yield*/, fetch("/api/games/guesswho/".concat(selectedCategory.gameType.id))];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch questions');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    fetchedData = _a.sent();
                    fetchedStatements = fetchedData.data.statements;
                    if (!Array.isArray(fetchedStatements)) {
                        throw new Error('Fetched data is not an array of statements');
                    }
                    questions = fetchedStatements.map(function (statement) { return ({
                        statement: statement.statement,
                    }); });
                    // Emit the start game event with the roomId and questions
                    if (gameType === 'GuessWho') {
                        socket.emit('startGuessWhoGame', { roomId: selectedQuiz.joinCode, questions: questions });
                        console.log("Starting Guess Who game in room ".concat(selectedQuiz.joinCode));
                    }
                    else if (gameType === 'HotSeat') {
                        socket.emit('startHotSeatGame', { roomId: selectedQuiz.joinCode, questions: questions });
                        console.log('Starting Hot Seat game');
                    }
                    onNavigate('loadingPage');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        setError(error_1.message);
                    }
                    else {
                        setError('An unexpected error occurred');
                    }
                    console.error('Error starting the game:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-auto">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        {(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'nul'}
      </h1>

      <p className="quiz_name mt-20 mb-10 self-center text-center text-white z-10">
        Choose Category
      </p>

      <SearchCategory_1.default categories={categories} onCategorySelect={handlePress}/>

      {loading && <p className="text-white">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && categories.length === 0 && !error && (<p className="text-white">No categories found.</p>)}

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <blueShape_1.default />
        </div>
        <button className={"".concat(pressedCategory ? 'orange_btn' : 'white_btn', " absolute bottom-10 right-10 z-10")} disabled={!pressedCategory} onClick={handleStartGame} // Directly call the handleStartGame function
    >
          Start
        </button>
      </div>
    </section>);
};
exports.default = ChooseCategoryPage;
