"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_confetti_1 = __importDefault(require("react-confetti"));
var AnswerResponsePage = function (_a) {
    var correct = _a.correct, points = _a.points, currentScore = _a.currentScore;
    return (<section className={"w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden ".concat(correct ? 'bg-correct-gradient' : 'bg-incorrect-gradient')}>
      {/* Conditionally render the confetti when the answer is correct */}
      {correct && (<div className="absolute inset-0 w-full h-full">
          <react_confetti_1.default width={window.innerWidth} height={window.innerHeight}/>
        </div>)}

      <div className="flex flex-col items-center justify-center">
        <p className='text-black mb-20 font-SourceSansPro font-Regular text-2xl'>
          {correct ? "+".concat(points) : "-".concat(points)} {/* Display points based on correctness */}
        </p>
        <h2 className='text-black mb-10 font-poppins font-bold text-2xl'>
          {correct ? 'Right!' : 'Wrong!'} {/* Display message based on correctness */}
        </h2>
        <h1 className='text-black mb-10 font-poppins font-medium text-6xl animation-scale-pulse'>
          {correct ? '🥳' : '😢'} {/* Display emoji based on correctness */}
        </h1>
        <p className='mb-40 font-SourceSansPro font-Regular'>On 7th place 348 points after Gustav</p>
      </div>
      <p className='absolute bottom-8 text-black font-SourceSansPro font-Regular text-xl'>
        Current score: <span className='font-bold'>{currentScore}</span>
      </p>
    </section>);
};
exports.default = AnswerResponsePage;
