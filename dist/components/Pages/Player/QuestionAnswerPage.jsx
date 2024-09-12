"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var QuestionAnswerPage = function (_a) {
    var _b;
    var onNavigate = _a.onNavigate, socket = _a.socket, questions = _a.questions, playerName = _a.playerName;
    var _c = (0, react_1.useState)(0), currentQuestionIndex = _c[0], setCurrentQuestionIndex = _c[1];
    var _d = (0, react_1.useState)(''), completedStatement = _d[0], setCompletedStatement = _d[1];
    var handleNext = function () {
        var updatedQuestion = __assign(__assign({}, questions[currentQuestionIndex]), { completedStatement: completedStatement, playerName: playerName });
        // Send completed statement back to the server
        if (socket) {
            socket.emit('submitGuessWhoAnswers', updatedQuestion);
        }
        // Move to the next question or finish
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCompletedStatement(''); // Reset input for the next question
        }
        else {
            onNavigate('loadingPage'); // Navigate to the next phase or page
        }
    };
    return (<section className="w-screen h-screen flex flex-col justify-between items-center bg-custom-purple relative overflow-hidden">
      <h1 className="mt-20 font-SourceSansPro font-regular text-4xl text-white">
        {"".concat(currentQuestionIndex + 1, "/").concat(questions.length)}
      </h1>

      <p className="self-center z-10 text-center text-white font-poppins font-medium text-4xl">
        {(_b = questions[currentQuestionIndex]) === null || _b === void 0 ? void 0 : _b.statement}
      </p>

      <textarea className="p-2 border mb-10 h-60 w-11/12 mx-10 rounded-md font-SourceSansPro font-regular resize-none focus:outline-none focus:ring-0" placeholder="Complete the statement..." value={completedStatement} onChange={function (e) { return setCompletedStatement(e.target.value); }}/>

      <div className="z-10 mx-10 mb-10 flex flex-row justify-end w-full">
        <button className="orange_btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </section>);
};
exports.default = QuestionAnswerPage;
