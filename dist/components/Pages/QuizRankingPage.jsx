"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pinkShape_1 = __importDefault(require("../icons/pinkShape"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var QuizRankingPage = function (_a) {
    var _b;
    var rankings = _a.rankings;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className="flex flex-row mx-14 mt-14 z-10 justify-between text-center">
        <h1 className="quiz_name text-white">{(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'Room'}</h1>
        <h1 className="font-SourceSansPro font-regular text-3xl text-white">7</h1>
      </div>

      <p className="quiz_name lg:mt-2 mt-10 lg:mb-2 mb-10 self-center text-center text-white z-10">
        Ranking
      </p>

      <div className="flex flex-col space-y-4 justify-center items-center">
        {rankings.map(function (rank, index) { return (<div key={index} className="flex justify-between bg-custom-blue w-64 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{rank.icon}</span>
              <span className="text-2xl font-SourceSansPro text-black font-medium">{rank.name}</span>
            </div>
            <span className="text-2xl text-black font-SourceSansPro font-medium">{rank.score}</span>
          </div>); })}
      </div>

      <div className="z-10 mx-10 mb-10 flex flex-row align-end self-end place-self-end justify-self-end">
        <button className="orange_btn">Next</button>
      </div>

      <div className="absolute top-0 right-0">
        <pinkShape_1.default />
      </div>
    </section>);
};
exports.default = QuizRankingPage;
