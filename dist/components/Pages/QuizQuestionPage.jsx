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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pinkShape_1 = __importDefault(require("../icons/pinkShape"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var QuizQuestionPage = function (_a) {
    var _b;
    var statements = _a.statements, socket = _a.socket, onNavigate = _a.onNavigate;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    var _c = (0, react_1.useState)([]), playerOptions = _c[0], setPlayerOptions = _c[1];
    var _d = (0, react_1.useState)(false), showCorrectAnswer = _d[0], setShowCorrectAnswer = _d[1]; // To control when to show the correct answer
    var _e = (0, react_1.useState)(15), timer = _e[0], setTimer = _e[1]; // 15 seconds timer
    (0, react_1.useEffect)(function () {
        var countdown = setInterval(function () {
            setTimer(function (prevTimer) { return (prevTimer > 0 ? prevTimer - 1 : 0); });
        }, 1000); // Decrease timer by 1 every second
        // When the timer hits 0, emit the "timeUp" event to the server
        if (timer === 0) {
            clearInterval(countdown); // Stop the interval
            if (socket && socket.connected) {
                socket.emit('timeUp'); // Emit the timeUp event without specifying the room
                setShowCorrectAnswer(true);
                console.log('Time is up, emitting to server');
            }
        }
        return function () { return clearInterval(countdown); }; // Cleanup on unmount
    }, [timer, socket]);
    (0, react_1.useEffect)(function () {
        if (showCorrectAnswer) {
            var navigateTimer_1 = setTimeout(function () {
                onNavigate('quizStatsPage'); // Navigate to quizRankingPage after 5 seconds
            }, 5000); // 5-second delay
            return function () { return clearTimeout(navigateTimer_1); }; // Cleanup the second timer on unmount
        }
    }, [showCorrectAnswer, onNavigate]);
    (0, react_1.useEffect)(function () {
        if (selectedQuiz) {
            var allPlayerNames = selectedQuiz.players.map(function (player) { return player.name; });
            var currentPlayerName_1 = statements[0].playerName || '';
            // Filter out the current player's name from the list
            var otherPlayerNames = allPlayerNames.filter(function (name) { return name !== currentPlayerName_1; });
            // Shuffle the array to get random names
            var shuffledNames = otherPlayerNames.sort(function () { return 0.5 - Math.random(); });
            // Select 3 unique random names from the shuffled list
            var randomNames = shuffledNames.slice(0, 3);
            // Combine the statement's playerName with the random names
            var options = __spreadArray([currentPlayerName_1], randomNames, true);
            // Shuffle the options to randomize their positions
            var shuffledOptions = options.sort(function () { return 0.5 - Math.random(); });
            // Map the shuffled options to specific positions
            var positionMapping = {
                leftTop: shuffledOptions[0],
                leftBottom: shuffledOptions[1],
                rightTop: shuffledOptions[2],
                rightBottom: shuffledOptions[3],
            };
            setPlayerOptions(shuffledOptions);
            // Format the statement
            var formattedStatement = formatStatement(statements[0].statement, statements[0].completedStatement || '');
            // Create the new question object to be emitted
            var newQuestion = {
                statement: formattedStatement,
                correctAnswer: currentPlayerName_1, // Correct player's name
                options: positionMapping, // Randomized options
            };
            // Emit the new question object via socket
            if (socket && socket.connected) {
                socket.emit('newQuestion', newQuestion);
                console.log('Emitting newQuestion:', newQuestion);
            }
        }
    }, [selectedQuiz, statements, socket]);
    // Function to process the statement and remove trailing dots
    var formatStatement = function (statement, completedStatement) {
        var trimmedStatement = statement.replace(/\.\.\.$/, '');
        return "".concat(trimmedStatement, " ").concat(completedStatement);
    };
    var currentStatement = statements[0];
    var getButtonOpacity = function (playerName) {
        if (!showCorrectAnswer)
            return 1; // Full opacity if the timer hasn't run out
        return playerName === statements[0].playerName ? 1 : 0.1; // Correct answer stays full opacity, others fade
    };
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center'>
        <h1 className={'quiz_name text-white '}>
          {(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'Room'}
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>{timer} seconds left</h1>
      </div>

      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl">
        {currentStatement
            ? "\"".concat(formatStatement(currentStatement.statement, currentStatement.completedStatement || ''), "\"")
            : 'No statement available'}
      </p>

      <div className='grid grid-rows-2 grid-flow-col'>
        {playerOptions.map(function (playerName, index) { return (<div key={index} className={"bg-quiz-".concat(index % 4 === 0 ? 'green' : index % 4 === 1 ? 'yellow' : index % 4 === 2 ? 'red' : 'blue', " w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl")} style={{ opacity: getButtonOpacity(playerName) }} // Set opacity based on correctness
        >
            {playerName || 'Unknown'}
          </div>); })}
      </div>

      <div className='absolute top-0 right-0'>
        <pinkShape_1.default />
      </div>
    </section>);
};
exports.default = QuizQuestionPage;
