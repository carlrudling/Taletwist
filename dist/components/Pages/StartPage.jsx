"use strict";
// StartPage.tsx
'use client';
// StartPage.tsx
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
var react_2 = require("next-auth/react");
var Nav_1 = __importDefault(require("../Nav"));
var SearchQuiz_1 = __importDefault(require("../SearchQuiz"));
var waveIcon_1 = __importDefault(require("../icons/waveIcon"));
var star_1 = __importDefault(require("../icons/star"));
var QuizCard_1 = __importDefault(require("../QuizCard"));
var Thoughtsform_1 = __importDefault(require("../Thoughtsform"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var StartPage = function (_a) {
    var onNavigate = _a.onNavigate, user = _a.user, socket = _a.socket, handlePlayerName = _a.handlePlayerName;
    var _b = (0, react_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = (0, react_2.useSession)(), session = _c.data, status = _c.status;
    var _d = (0, react_1.useState)([]), quizzes = _d[0], setQuizzes = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)(false), thoughtsField = _g[0], setThoughtsField = _g[1];
    var formRef = (0, react_1.useRef)(null);
    // Access the context
    var setSelectedQuiz = (0, QuizProvider_1.useQuizContext)().setSelectedQuiz;
    var handleThoughtsFieldToggle = function () {
        setThoughtsField(!thoughtsField);
    };
    var handleClickOutside = function (event) {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setThoughtsField(false);
        }
    };
    var handleQuizSelect = function (quiz) {
        if (user && socket) {
            var role = 'creator';
            socket.emit('joinRoom', { roomId: quiz.joinCode, role: role }, function (response) {
                if (response.success) {
                    setSelectedQuiz(quiz); // Set the selected quiz in context
                    onNavigate('join'); // Navigate to the join page
                }
                else {
                    console.error('Failed to join room as creator:', response.message);
                    // Optionally, show an error message to the user
                }
            });
        }
        else {
            // If the user is not logged in or socket is not available
            console.error('User or socket not available');
        }
    };
    (0, react_1.useEffect)(function () {
        if (thoughtsField) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [thoughtsField]);
    (0, react_1.useEffect)(function () {
        setIsVisible(true);
    }, []);
    (0, react_1.useEffect)(function () {
        var fetchQuizzes = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id))
                            return [2 /*return*/];
                        setLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/quizzes/creator/".concat(user.id))];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch quizzes: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        setQuizzes(data.data);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        setError(err_1.message || 'An unexpected error occurred');
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        if (status === 'authenticated') {
            fetchQuizzes();
        }
    }, [status, user === null || user === void 0 ? void 0 : user.id]);
    return (<section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
      <Nav_1.default onNavigate={onNavigate}/>
      <h1 className={"head_text text-center text-custom-orange z-20 ".concat(isVisible ? 'fall-animation' : '')}>
        Discover & Share
        <br />
        <span className="blue_gradient text-center text-white z-10">
          Stories with your Friends
        </span>
      </h1>
      <p className="desc text-center z-10">
        Taletwist is a new way to share stories among friends through fun games
        like <span className="font-bold">Guess Who</span> and{' '}
        <span className="font-bold">🔥Hot Seat🔥</span>
      </p>
      <SearchQuiz_1.default socket={socket} onNavigate={onNavigate} user={user} handlePlayerName={handlePlayerName}/>

      {/* Display loading, error, or quizzes */}
      <div className="z-20 mt-8 w-full flex flex-col lg:flex-row items-center justify-center">
        {loading && <p className="text-white">Loading quizzes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {quizzes.map(function (quiz) { return (<QuizCard_1.default key={quiz._id} quiz={quiz} buttonLabel="Select" onNavigate={function () { return handleQuizSelect(quiz); }}/>); })}
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className={"text-6xl absolute z-10 ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '10%', left: '10%' }}>
          🤭
        </div>
        <div className={"text-6xl absolute ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '30%', left: '5%' }}>
          😍
        </div>
        <div className={"text-6xl absolute z-10 ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '70%', left: '15%' }}>
          🤯
        </div>
        <div className={"text-6xl absolute z-10 ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '8%', right: '2%' }}>
          🥳
        </div>
        <div className={"text-6xl absolute z-10 ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '15%', right: '11%' }}>
          🤣
        </div>
        <div className={"text-6xl absolute z-10 ".concat(isVisible ? 'fall-animation' : '')} style={{ top: '45%', right: '12%' }}>
          🤩
        </div>
        <div className={"absolute h-28 w-28 ".concat(isVisible ? 'fall-spin-animation' : '')} style={{ top: '60%', left: '11%' }}>
          <star_1.default color="text-custom-lightOrange"/>
        </div>
        <div className={"absolute rotate-45 h-10 w-10 rotate-90 ".concat(isVisible ? 'fall-spin-animation' : '')} style={{ top: '16%', left: '12%' }}>
          <star_1.default color="text-custom-pink"/>
        </div>
        <div className={"absolute h-16 w-16 ".concat(isVisible ? 'fall-spin-animation' : '')} style={{ top: '50%', right: '15%' }}>
          <star_1.default color="text-custom-blue"/>
        </div>
        <div className={"absolute rotate-45 h-8 w-8 ".concat(isVisible ? 'fall-spin-animation' : '')} style={{ top: '20%', right: '5%' }}>
          <star_1.default color="text-custom-light-green"/>
        </div>
        <waveIcon_1.default />
      </div>

      {thoughtsField ? (<div ref={formRef} className="absolute bottom-10 right-10 mr-16 w-full max-w-xs z-20">
          <Thoughtsform_1.default />
        </div>) : (<button className="absolute bottom-4 right-4 bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded" onClick={handleThoughtsFieldToggle}>
          Thoughts?
        </button>)}
    </section>);
};
exports.default = StartPage;
