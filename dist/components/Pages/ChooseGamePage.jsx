"use strict";
// ChooseGamePage.tsx
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
var guessWhoIcon_1 = __importDefault(require("../icons/guessWhoIcon"));
var hotSeatIcon_1 = __importDefault(require("../icons/hotSeatIcon"));
var whosthatface_1 = __importDefault(require("../icons/whosthatface"));
var triviaIcon_1 = __importDefault(require("../icons/triviaIcon"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var ChooseGamePage = function (_a) {
    var _b;
    var onNavigate = _a.onNavigate, user = _a.user, setGameType = _a.setGameType;
    var _c = (0, react_1.useState)(null), pressedGame = _c[0], setPressedGame = _c[1];
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    var handlePress = function (gameName) {
        setPressedGame(gameName);
        setGameType(gameName); // Set the game type when a game is selected
    };
    var handleNext = function () {
        // Navigate to the next page with gameType if available
        if (pressedGame) {
            onNavigate('choose-category', pressedGame);
        }
        else {
            onNavigate('choose-category');
        }
    };
    var games = [
        { name: 'GuessWho', icon: <guessWhoIcon_1.default width='100%' height='100%'/> },
        { name: 'HotSeat', icon: <hotSeatIcon_1.default width='100%' height='100%'/> },
        { name: 'Trivia', icon: <triviaIcon_1.default width='100%' height='100%'/> },
        { name: 'WhosThatFace', icon: <whosthatface_1.default width='100%' height='100%'/> },
        { name: 'MostLikely', icon: <guessWhoIcon_1.default width='100%' height='100%'/> }
    ];
    return (<section className="w-screen h-screen flex flex-col justify-between items-center bg-custom-purple relative overflow-auto lg:overflow-hidden">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        {(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'null'}
      </h1>

      <p className="quiz_name lg:mt-2 mt-10 lg:mb-2 mb-10 self-center text-center text-white z-10">
        Choose Game
      </p>

      <div className="flex justify-center w-full z-10">
        <div className="text-3xl grid lg:grid-cols-3 gap-x-40 lg:mb-2 mb-10 gap-y-10 text-medium text-white text-center font-sourceSansPro justify-center">
          {games.map(function (game) { return (<div key={game.name} className={"game_card border-4 flex flex-col justify-center items-center ".concat(pressedGame === game.name ? 'border-custom-orange border-3' : 'border-white ')} onClick={function () { return handlePress(game.name); }}>
              <div className="w-40 h-40 ">
                {game.icon}
              </div>
              <p className="font-SourceSansPro text-3xl items-center text-black">{game.name}</p>
            </div>); })}
        </div>
      </div>

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <blueShape_1.default />
        </div>
        <button className={"".concat(pressedGame ? 'orange_btn' : 'white_btn')} disabled={!pressedGame} onClick={handleNext} // Use handleNext function for navigation
    >
          Next
        </button>
      </div>
    </section>);
};
exports.default = ChooseGamePage;
