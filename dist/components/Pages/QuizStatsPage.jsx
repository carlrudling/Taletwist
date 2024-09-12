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
var QuizStatsPage = function (_a) {
    var statsData = _a.statsData, onNavigate = _a.onNavigate;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    // Define the order of positions
    var positionOrder = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom'];
    // Define color mapping based on the position
    var colorMapping = {
        leftTop: 'bg-quiz-green',
        rightTop: 'bg-quiz-red',
        leftBottom: 'bg-quiz-yellow',
        rightBottom: 'bg-quiz-blue',
    };
    // Filter and sort the votes based on the positionOrder
    var sortedVotes = positionOrder.map(function (position) {
        var vote = statsData.find(function (item) { return item.position === position; });
        return {
            name: vote ? vote.answer : 'Unknown', // If no answer for this position, default to 'Unknown'
            votes: vote ? vote.votes : 0, // If no votes for this position, default to 0
            color: colorMapping[position], // Set color based on the position
        };
    });
    var maxVotes = Math.max.apply(Math, __spreadArray(__spreadArray([], sortedVotes.map(function (v) { return v.votes; }), false), [1], false)); // Avoid divide by zero
    // Set up the timer to navigate after 5 seconds
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            onNavigate('quizRankingPage');
        }, 5000); // 5 seconds delay
        // Clean up the timer when the component unmounts
        return function () { return clearTimeout(timer); };
    }, [onNavigate]);
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center'>
        <h1 className={'quiz_name text-white'}>
          Class Quiz
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
      </div>
      
      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl mt-20">
        “Growing up my favorite movie was Zorro”
      </p>

      <div className='flex justify-center items-end w-full px-14 lg:space-x-32 space-x-8'>
        {sortedVotes.map(function (vote, index) { return (<div key={index} className='flex flex-col items-center'>
            <div className={"".concat(vote.color, " w-12")} style={{ height: "".concat((vote.votes / maxVotes) * 200, "px") }}></div>
            <span className='mt-2 text-white font-SourceSansPro text-xl'>{vote.name}</span>
            <span className='text-white font-SourceSansPro'>{vote.votes} votes</span>
          </div>); })}
      </div>

      <div className='absolute top-0 right-0'>
        <pinkShape_1.default />
      </div>
    </section>);
};
exports.default = QuizStatsPage;
