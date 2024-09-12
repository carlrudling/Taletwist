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
var blueShape_1 = __importDefault(require("../icons/blueShape"));
var ExplainHotSeat_1 = __importDefault(require("../ExplainHotSeat"));
var ExplainWhosThatFace_1 = __importDefault(require("../ExplainWhosThatFace"));
var GameExplanationPage = function () {
    var _a = (0, react_1.useState)('Hot Seat'), chosenGame = _a[0], setChosenGame = _a[1];
    var handlePress = function (gameName) {
        setChosenGame(gameName);
    };
    var renderGameExplanation = function () {
        switch (chosenGame) {
            case 'Hot Seat':
                return <ExplainHotSeat_1.default />;
            case 'Who’s that face?':
                return <ExplainWhosThatFace_1.default />;
            // Add more cases here for other games
            default:
                return <p className='text-white'>Please select a game</p>;
        }
    };
    return (<section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
       <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
    <h1 className={'quiz_name text-white'}>
      {/*quiz.name*/} Class Quiz
      </h1>

      <h1 className='font-SourceSansPro font-regular text-3xl text-white'>1/20</h1>
    </div>

      <p className="quiz_name mt-20 lg:mb-2 mb-10 self-center text-center text-white z-10">
        {chosenGame}
      </p>

  <div className="flex-grow flex justify-center items-center">
        {renderGameExplanation()}
      </div>

     <div className="flex justify-end p-10 z-10">
          <button className={"".concat(chosenGame ? 'orange_btn' : 'white_btn')} disabled={!chosenGame}>
          {/* handleClick */}
          Got it
        </button>
      </div>

      <div className="absolute top-0 left-0 z-0">
        <blueShape_1.default />
      </div>
    </section>);
};
exports.default = GameExplanationPage;
