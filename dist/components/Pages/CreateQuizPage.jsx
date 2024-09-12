"use strict";
// CreateQuizPage.tsx
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
var pinkCircle_1 = __importDefault(require("../icons/pinkCircle"));
var Nav_1 = __importDefault(require("../Nav"));
var CreateQuizPage = function (_a) {
    var onNavigate = _a.onNavigate, user = _a.user;
    var _b = (0, react_1.useState)(''), quizName = _b[0], setQuizName = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    // Function to generate a random 8-digit join code
    var generateJoinCode = function () {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };
    var handleQuizNameChange = function (event) {
        setQuizName(event.target.value);
        // Clear the error message when the user starts typing
        if (error) {
            setError(null);
        }
    };
    var handleCreateQuiz = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var quizData, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    // Check if the quiz name is provided
                    if (!quizName.trim()) {
                        setError('Please enter a quiz name.');
                        return [2 /*return*/];
                    }
                    // Check if the user is provided
                    // Check if the user is provided
                    if (!user) {
                        setError('You must be logged in to create a quiz.');
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    quizData = {
                        name: quizName.trim(),
                        creatorId: user.id, // Use the user ID from the prop
                        joinCode: generateJoinCode(),
                    };
                    return [4 /*yield*/, fetch('/api/quizzes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(quizData), // Ensure these fields are present
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.ok) {
                        console.log('Quiz Created:', data);
                        // Optionally reset form or navigate to another page
                        setQuizName('');
                        onNavigate('someOtherPage'); // Redirect to another page if needed
                    }
                    else {
                        setError(data.message || 'Failed to create quiz');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error creating quiz:', error_1);
                    setError('An error occurred while creating the quiz.');
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<section className="flex flex-col justify-between w-screen h-screen bg-custom-purple relative overflow-hidden">
      <Nav_1.default onNavigate={onNavigate}/>

      <div className="flex flex-row self-start ml-4 mr-14 mb-60 lg:ml-20">
        <form className="create_quiz_form flex flex-col z-10 mb-2 p-20" onSubmit={handleCreateQuiz}>
          <h2 className="head_text mb-6">Create Quiz</h2>

          <p className="font-sourceSansPro mb-4 text-2xl font-regular text-black">
            A quiz lasts for 5 hours 🕑
          </p>

          <p className="font-sourceSansPro mb-4 text-l font-regular text-black">
            When creating a quiz you can enjoy a number of fun games to play with friends and get to know each other better.
          </p>

          <p className="font-sourceSansPro text-l font-regular mb-3 text-black">Choose a catchy quiz name!</p>

          <input type="text" placeholder="Quiz Name" value={quizName} onChange={handleQuizNameChange} required className="search_input"/>

          {/* Display an error message if there's an issue */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="z-10 mx-10 mt-10  flex flex-row align-end self-end place-self-end justify-self-end">
            <button type="submit" className={"".concat(quizName ? 'orange_btn' : 'purple_btn')} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute top-20 left-0">
        <pinkCircle_1.default />
      </div>
    </section>);
};
exports.default = CreateQuizPage;
