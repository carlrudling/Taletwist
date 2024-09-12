"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var waveIcon_1 = __importDefault(require("../icons/waveIcon"));
var loadingAnimation_json_1 = __importDefault(require("../animations/loadingAnimation.json"));
var lottie_react_1 = __importDefault(require("lottie-react"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var LoadingPage = function (_a) {
    var _b;
    var onNavigate = _a.onNavigate, user = _a.user, socket = _a.socket, loadingText = _a.loadingText;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    return (<section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
    
      <h1 className={'quiz_name ml-14 mt-14 z-10 flex flex-row text-center self-start text-white z-10 hidden lg:block '}>
      {(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'null'}
      </h1>

      <p className="mt-40 self-center z-10 text-center z-10 text-white font-poppins font-medium mx-10 text-3xl">
             {loadingText}
      </p>
    <lottie_react_1.default animationData={loadingAnimation_json_1.default} className='w-80 '/>




    <div className='w-full hidden lg:block'>
 <waveIcon_1.default />
    </div>
    </section>);
};
exports.default = LoadingPage;
