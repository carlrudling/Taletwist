"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var QuestionGuessPage = function (_a) {
    var socket = _a.socket, onNavigate = _a.onNavigate, handleAnswerQuestion = _a.handleAnswerQuestion;
    var _b = (0, react_1.useState)(null), question = _b[0], setQuestion = _b[1];
    var _c = (0, react_1.useState)(null), selectedAnswer = _c[0], setSelectedAnswer = _c[1];
    var _d = (0, react_1.useState)(null), isCorrect = _d[0], setIsCorrect = _d[1];
    var _e = (0, react_1.useState)(1000), timer = _e[0], setTimer = _e[1]; // Initial timer value (1000 points)
    var _f = (0, react_1.useState)(false), isAnswered = _f[0], setIsAnswered = _f[1];
    var _g = (0, react_1.useState)(0), currentScore = _g[0], setCurrentScore = _g[1]; // Track current score
    var _h = (0, react_1.useState)(false), isTimeUp = _h[0], setIsTimeUp = _h[1];
    (0, react_1.useEffect)(function () {
        if (socket && socket.connected) {
            // Listen for the "timeUp" event
            socket.on('timeUp', function () {
                console.log('Time is up!');
                setIsTimeUp(true); // Update local state when time is up
                handleAnswerQuestion(false, 0); // No points for incorrect answers
                // Emit currentScore when the time is up (too late)
                if (socket) {
                    socket.emit('currentScore', { currentScore: currentScore, correct: false, answer: undefined });
                }
                onNavigate('AnswerToSlow'); // Navigate to the "AnswerTooSlow" page
            });
            return function () {
                socket.off('timeUp'); // Clean up the event listener
            };
        }
    }, [socket, onNavigate, currentScore]);
    // Timer effect: Decrease timer over 15 seconds
    (0, react_1.useEffect)(function () {
        var interval;
        if (!isAnswered) {
            interval = setInterval(function () {
                setTimer(function (prevTimer) { return (prevTimer > 0 ? prevTimer - (1000 / (15 * 100)) : 0); });
                // Decrease by 1000 points over 15 seconds (15*100 steps for a 10ms interval)
            }, 10); // Adjust timer every 10ms
        }
        return function () {
            clearInterval(interval); // Clear interval when component unmounts or when the question is answered
        };
    }, [isAnswered, timer, onNavigate]);
    // Listen for a new question from the server
    (0, react_1.useEffect)(function () {
        if (socket && socket.connected) {
            console.log('Socket is connected');
            // Listen for the 'newQuestion' event
            socket.on('newQuestion', function (newQuestion) {
                console.log('Players received new question:', newQuestion);
                setQuestion(newQuestion); // Set the new question
                setSelectedAnswer(null); // Reset selected answer
                setIsCorrect(null); // Reset correctness
                setIsAnswered(false); // Allow answering the new question
                setTimer(1000); // Reset the timer to 1000 points
            });
            return function () {
                socket.off('newQuestion');
            };
        }
        else {
            console.log('Socket is not available or not connected');
        }
    }, [socket]);
    // Handle answer click
    var handleAnswerClick = function (answer, position) {
        setSelectedAnswer(answer);
        setIsAnswered(true); // Stop the timer when an answer is clicked
        if (question && answer === question.correctAnswer) {
            setIsCorrect(true);
            var points = Math.floor(timer);
            var newScore = currentScore + points;
            // Emit currentScore, correctness, answer, and position
            if (socket) {
                console.log("Emitting correct answer, score: ".concat(newScore, ", position: ").concat(position));
                socket.emit('currentScore', { currentScore: newScore, correct: true, answer: answer, position: position });
            }
            setCurrentScore(newScore); // Update local score
            handleAnswerQuestion(true, points); // Pass correct and points
        }
        else {
            setIsCorrect(false);
            // Emit currentScore, incorrect answer, and position
            if (socket) {
                console.log("Emitting incorrect answer, score: ".concat(currentScore, ", position: ").concat(position));
                socket.emit('currentScore', { currentScore: currentScore, correct: false, answer: answer, position: position });
            }
            handleAnswerQuestion(false, 0); // Pass incorrect and zero points
        }
        setTimeout(function () {
            onNavigate('AnswerResponsePage'); // Navigate to the next page
        }, 1000); // Delay for a short period to show feedback
    };
    if (!question) {
        console.log('Still waiting for the question data');
        return <div>Waiting for the question...</div>;
    }
    console.log('Rendering with question:', question);
    return (<section className="w-screen h-screen grid grid-rows-2 grid-cols-2 relative overflow-hidden">
    <button className='bg-quiz-green flex items-center justify-center text-black font-poppins font-medium text-3xl' onClick={function () { return handleAnswerClick(question.options.leftTop, 'leftTop'); }}>
  {question.options.leftTop}
    </button>
    <button className='bg-quiz-red flex items-center justify-center text-black font-poppins font-medium text-3xl' onClick={function () { return handleAnswerClick(question.options.rightTop, 'rightTop'); }}>
  {question.options.rightTop}
    </button>
    <button className='bg-quiz-yellow flex items-center justify-center text-black font-poppins font-medium text-3xl' onClick={function () { return handleAnswerClick(question.options.leftBottom, 'leftBottom'); }}>
  {question.options.leftBottom}
    </button>
    <button className='bg-quiz-blue flex items-center justify-center text-black font-poppins font-medium text-3xl' onClick={function () { return handleAnswerClick(question.options.rightBottom, 'rightBottom'); }}>
  {question.options.rightBottom}
    </button>


      {/* Display feedback if the player has selected an answer */}
      {selectedAnswer && (<div className="absolute bottom-0 w-full text-center">
          {isCorrect ? (<p className="text-green-500 text-2xl">Correct! Score: {Math.floor(timer)}</p>) : (<p className="text-red-500 text-2xl">Incorrect!</p>)}
        </div>)}

      {/* Display the countdown timer */}
      <div className="absolute top-4 left-4 text-white text-2xl">
        Time Remaining: {Math.floor(timer)} ms
      </div>
    </section>);
};
exports.default = QuestionGuessPage;
