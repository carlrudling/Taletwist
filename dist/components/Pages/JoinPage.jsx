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
var pinkCircle_1 = __importDefault(require("../icons/pinkCircle"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var JoinPage = function (_a) {
    var _b;
    var onNavigate = _a.onNavigate, user = _a.user, socket = _a.socket;
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz;
    var _c = (0, react_1.useState)(0), currentPage = _c[0], setCurrentPage = _c[1];
    var playersPerPage = 18;
    var _d = (0, react_1.useState)((selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.players) || []), players = _d[0], setPlayers = _d[1];
    (0, react_1.useEffect)(function () {
        if (socket) {
            // Lyssna på 'userJoined' händelsen från servern
            socket.on('userJoined', function (_a) {
                var userId = _a.userId, role = _a.role;
                console.log('Ny användare ansluten:', userId, role);
                var newPlayer = {
                    _id: userId, // Använd userId som ett temporärt _id
                    id: userId, // Använd userId för id
                    name: "Player ".concat(players.length + 1), // Justera namnlogik efter behov
                    score: 0, // Standardpoäng
                    wins: 0, // Standardvinster
                };
                setPlayers(function (prevPlayers) { return __spreadArray(__spreadArray([], prevPlayers, true), [newPlayer], false); });
            });
            // Städa upp lyssnaren när komponenten avmonteras
            return function () {
                socket.off('userJoined');
            };
        }
    }, [socket, players.length]);
    var handleButtonClick = function () {
        onNavigate('chooseGame');
    };
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            setCurrentPage(function (prevPage) { return (prevPage + 1) % Math.ceil(players.length / playersPerPage); });
        }, 3000);
        return function () { return clearInterval(interval); };
    }, [players]);
    var start = currentPage * playersPerPage;
    var end = start + playersPerPage;
    var visiblePlayers = players.slice(start, end);
    var gridColumns = 'grid-cols-3';
    if (visiblePlayers.length > 9) {
        gridColumns = visiblePlayers.length === 18 ? 'grid-cols-12' : 'grid-cols-6';
    }
    var _e = (0, react_1.useState)(false), isPremium = _e[0], setIsPremium = _e[1];
    var _f = (0, react_1.useState)(false), showPopup = _f[0], setShowPopup = _f[1];
    (0, react_1.useEffect)(function () {
        if (!isPremium && players.length >= 6) {
            setShowPopup(true);
        }
        else {
            setShowPopup(false);
        }
    }, [isPremium, players.length]);
    return (<section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
      {showPopup && (<div className="absolute flex flex-row items-center gap-2 top-5 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded shadow-lg z-20">
          <p className="text-center">Maximum players reached!</p>
          <button className="mt-2 bg-custom-purple hover:bg-custom-orange text-white py-1 px-4 rounded" onClick={function () {
                console.log('Upgrade to Premium');
            }}>
            👑 Upgrade Now
          </button>
        </div>)}

      <h1 className='quiz_name ml-14 mt-14 z-10 flex flex-row text-center self-start text-white'>
        {(_b = selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.name) !== null && _b !== void 0 ? _b : 'null'}
      </h1>

      <p className="quiz_name lg:mb-8 mb-2 mt-20 self-center z-10 text-center text-white">
        Players
      </p>

      <div className="flex justify-center w-full z-10">
        <div className={"text-xl lg:text-3xl grid ".concat(gridColumns, " gap-2 lg:gap-4 text-medium text-white text-center font-sourceSansPro")}>
          {visiblePlayers.map(function (player, index) { return (<p key={index}>{player.name}</p>); })}
        </div>
      </div>

      <div className="absolute top-20 left-0">
        <pinkCircle_1.default />
      </div>
      <div className='absolute bottom-10 w-full'>
        <div className="mx-10 mb-10 flex flex-row justify-between self-stretch items-end">
          <p className='players_text text-white z-10' style={{ letterSpacing: '0.1em' }}>
            {(selectedQuiz === null || selectedQuiz === void 0 ? void 0 : selectedQuiz.joinCode) || 'Join Code'}
          </p>

          <button className='orange_btn' onClick={handleButtonClick}>
            Start
          </button>
        </div>
      </div>
    </section>);
};
exports.default = JoinPage;
