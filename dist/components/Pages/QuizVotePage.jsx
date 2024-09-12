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
var votesIconAnimation_1 = __importDefault(require("../animations/votesIconAnimation"));
var QuizVotePage = function () {
    var _a = (0, react_1.useState)(false), isUpVoted = _a[0], setIsUpvoted = _a[1];
    var handleVoted = function () {
        setIsUpvoted(function (prevState) { return !prevState; });
    };
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
        <h1 className={'quiz_name text-white'}>
          Class Quiz
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
      </div>
      
      <p className="quiz_name lg:mt-2 mt-10 lg:mb-2 mb-10 self-center text-center text-white z-10">
        Thoughts of the category? 
      </p>

      <div className="flex flex-col space-y-4 justify-center items-center">
        <button className='flex flex-col space-y-4 items-center justify-center w-full h-full relative' onClick={handleVoted}>
          <votesIconAnimation_1.default color={isUpVoted ? '#59C134' : '#FFFFFF'} height='100px' animate={isUpVoted}/>
          <p className='font-SourceSansPro font-regular text-3xl text-white'>Upvote</p>
        </button>
      </div>

      <div className="z-10 mx-10 mb-10 flex flex-row align-end self-end place-self-end justify-self-end">  
        <button className='orange_btn'>
          Next
        </button>
      </div>

      <div className='absolute top-0 right-0 '>
        <pinkShape_1.default />
      </div>
    </section>);
};
exports.default = QuizVotePage;
