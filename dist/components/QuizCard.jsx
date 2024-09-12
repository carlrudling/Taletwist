"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var react_2 = require("react");
var QuizCard = function (_a) {
    var onNavigate = _a.onNavigate, quiz = _a.quiz, onButtonClick = _a.onButtonClick, _b = _a.buttonLabel, buttonLabel = _b === void 0 ? 'Select' : _b;
    var router = (0, navigation_1.useRouter)();
    var session = (0, react_1.useSession)().data;
    var _c = (0, react_2.useState)(''), remainingTime = _c[0], setRemainingTime = _c[1]; // State to hold remaining time
    // Use onNavigate function to change the page
    var handleButtonClick = function () {
        onNavigate('join'); // Navigate to the join page
    };
    // Function to calculate remaining time until quiz expires
    var calculateRemainingTime = function () {
        var quizDuration = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
        var quizEndTime = new Date(quiz.createdDate).getTime() + quizDuration;
        var currentTime = new Date().getTime();
        var timeDifference = quizEndTime - currentTime;
        if (timeDifference <= 0) {
            return 'Expired';
        }
        var hours = Math.floor(timeDifference / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return "".concat(hours, "h ").concat(minutes, "m ").concat(seconds, "s");
    };
    // Update remaining time every second
    (0, react_2.useEffect)(function () {
        var timer = setInterval(function () {
            setRemainingTime(calculateRemainingTime());
        }, 1000);
        // Clean up the timer when the component unmounts
        return function () { return clearInterval(timer); };
    }, []);
    return (<div className='quiz_card grid grid-row-3 mt-20 z-10'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl font-poppins font-bold text-black'>{quiz.name}</h3>
        <div className='flex flex-row items-center'>
          <p className='text-black text-sm text-sourceSansPro'>
            {quiz.players.length} {quiz.players.length === 1 ? 'player' : 'players'} joined
          </p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center align-center'>
        <p className='text-black text-sm text-sourceSansPro '>
          Ends in: {remainingTime}
        </p>
        <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded' onClick={handleButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </div>);
};
exports.default = QuizCard;
