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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var pinkShape_1 = __importDefault(require("../icons/pinkShape"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var react_confetti_1 = __importDefault(require("react-confetti"));
var podium_1 = __importDefault(require("../icons/podium"));
var QuizPodiumPage = function () {
    var _a;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    var _b = (0, react_1.useState)({ width: 0, height: 0 }), dimensions = _b[0], setDimensions = _b[1];
    (0, react_1.useEffect)(function () {
        // This code will only run on the client-side
        if (typeof window !== "undefined") {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        }
    }, []);
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className="flex flex-row mx-14 mt-14 z-10 justify-between text-center">
        <h1 className="quiz_name text-white">{(_a = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _a !== void 0 ? _a : 'Room'}</h1>
        <h1 className="font-SourceSansPro font-regular text-3xl text-white"></h1>
      </div>

      <div className="flex flex-col space-y-4 justify-center items-center">
      <podium_1.default />
      </div>

      <div className="absolute bottom-10 right-10 ">
        <button className="orange_btn">Next</button>
      </div>

      <div className="absolute top-0 right-0">
        <pinkShape_1.default />
      </div>
 <div className="absolute inset-0 w-full h-full">
        <react_confetti_1.default width={dimensions.width} height={dimensions.height}/>
        </div>
    </section>);
};
exports.default = QuizPodiumPage;
