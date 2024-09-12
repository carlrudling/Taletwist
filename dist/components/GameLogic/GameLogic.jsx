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
var react_2 = require("next-auth/react");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var StartPage_1 = __importDefault(require("../Pages/StartPage"));
var JoinPage_1 = __importDefault(require("../Pages/JoinPage"));
var CreateQuizPage_1 = __importDefault(require("../Pages/CreateQuizPage"));
var ProfilePage_1 = __importDefault(require("../Pages/ProfilePage"));
var CreateCategoryPage_1 = __importDefault(require("../Pages/CreateCategoryPage"));
var SubscriptionPage_1 = __importDefault(require("../Pages/SubscriptionPage"));
var ChooseGamePage_1 = __importDefault(require("../Pages/ChooseGamePage"));
var ChooseCategoryPage_1 = __importDefault(require("../Pages/ChooseCategoryPage"));
var JoinedQuizResponsePage_1 = __importDefault(require("../Pages/Player/JoinedQuizResponsePage"));
var LoadingPage_1 = __importDefault(require("../Pages/LoadingPage"));
var QuestionAnswerPage_1 = __importDefault(require("../Pages/Player/QuestionAnswerPage"));
var QuizProvider_1 = require("@/app/provider/QuizProvider");
var QuizQuestionPage_1 = __importDefault(require("../Pages/QuizQuestionPage"));
var QuestionGuessPage_1 = __importDefault(require("../Pages/Player/QuestionGuessPage"));
var AnswerResponsePage_1 = __importDefault(require("../Pages/AnswerResponsePage"));
var AnswerToSlowPage_1 = __importDefault(require("../Pages/Player/AnswerToSlowPage"));
var QuizRankingPage_1 = __importDefault(require("../Pages/QuizRankingPage"));
var QuizStatsPage_1 = __importDefault(require("../Pages/QuizStatsPage"));
var GameLogic = function () {
    var _a = (0, react_2.useSession)(), session = _a.data, status = _a.status;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)('start'), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = (0, react_1.useState)(null), gameType = _d[0], setGameType = _d[1];
    var _e = (0, react_1.useState)(null), socket = _e[0], setSocket = _e[1];
    var _f = (0, react_1.useState)(null), quiz = _f[0], setQuiz = _f[1]; // Define the state to hold a quiz
    var _g = (0, react_1.useState)(null), category = _g[0], setCategory = _g[1];
    var _h = (0, react_1.useState)([]), questions = _h[0], setQuestions = _h[1]; // State to hold questions for the game
    var _j = (0, react_1.useState)([]), finalStatements = _j[0], setFinalStatements = _j[1]; // State to hold final statements
    var selectedQuiz = (0, QuizProvider_1.useQuizContext)().selectedQuiz; // Get the selected quiz from context
    var _k = (0, react_1.useState)(null), playerName = _k[0], setPlayerName = _k[1]; // Explicitly define the type
    var _l = (0, react_1.useState)(false), correct = _l[0], setCorrect = _l[1];
    var _m = (0, react_1.useState)(0), points = _m[0], setPoints = _m[1];
    var _o = (0, react_1.useState)(0), currentScore = _o[0], setCurrentScore = _o[1];
    var _p = (0, react_1.useState)([]), rankings = _p[0], setRankings = _p[1]; // Add state to store rankings
    var _q = (0, react_1.useState)([]), statsData = _q[0], setStatsData = _q[1]; // Initialize with an empty array
    (0, react_1.useEffect)(function () {
        if (status === 'authenticated' && (session === null || session === void 0 ? void 0 : session.user)) {
            setUser(session.user);
        }
    }, [session, status]);
    (0, react_1.useEffect)(function () {
        var newSocket = (0, socket_io_client_1.default)('http://localhost:3001');
        setSocket(newSocket);
        newSocket.on('connect', function () {
            console.log('Connected to socket server');
        });
        newSocket.on('disconnect', function () {
            console.log('Disconnected from socket server');
        });
        // Listen for the startGuessWhoGame event and store questions
        newSocket.on('startGuessWhoGame', function (receivedQuestions) {
            console.log('Received questions:', receivedQuestions);
            setQuestions(receivedQuestions); // Store the received questions
            setCurrentPage('QuestionAnswerPage'); // Navigate to the QuestionAnswerPage
        });
        newSocket.on('allStatementsReceived', function (statements) {
            console.log('Received all statements in GameLogic:', statements);
            setFinalStatements(statements);
            console.log('Navigating to QuizQuestionPage');
            setCurrentPage('QuizQuestionPage');
        });
        newSocket.on('QuestionGuessPage', function () {
            console.log('Navigating to QuestionGuessPage');
            setCurrentPage('QuestionGuessPage');
        });
        // Listen for the 'allPlayersAnswered' event for rankings
        newSocket.on('allPlayersAnswered', function (roomResponses) {
            console.log('Received allPlayersAnswered:', roomResponses);
            // Process responses for stats
            var voteCount = {}; // Store both votes and position
            roomResponses.forEach(function (response) {
                if (response.answer && response.position) {
                    if (!voteCount[response.answer]) {
                        voteCount[response.answer] = { votes: 0, position: response.position };
                    }
                    voteCount[response.answer].votes += 1;
                }
            });
            // Convert voteCount object into the required array format with { answer, votes, position }
            var statsDataArray = Object.keys(voteCount).map(function (answer) { return ({
                answer: answer,
                votes: voteCount[answer].votes,
                position: voteCount[answer].position,
            }); });
            setStatsData(statsDataArray); // Save the stats data for use in QuizStatsPage
            // Map the room responses to the ranking format
            var updatedRankings = roomResponses
                .map(function (response) { return ({
                name: response.playerName || 'Unknown',
                score: response.currentScore,
                icon: response.correct ? '🔥' : '🥶',
            }); })
                .sort(function (a, b) { return b.score - a.score; })
                .slice(0, 5); // Take only the top 5 players
            console.log('Updated rankings:', updatedRankings);
            setRankings(updatedRankings); // Set the rankings state
        });
        return function () {
            newSocket.disconnect();
        };
    }, [session, status]);
    (0, react_1.useEffect)(function () {
        if (typeof window !== 'undefined') {
            var handleHashChange_1 = function () {
                var hashParts = window.location.hash.replace('#', '').split(':');
                var newPage = hashParts[0] || 'start';
                var gameTypeParam = hashParts[1] || null;
                setCurrentPage(newPage);
                setGameType(gameTypeParam);
            };
            window.addEventListener('hashchange', handleHashChange_1);
            handleHashChange_1();
            return function () {
                window.removeEventListener('hashchange', handleHashChange_1);
            };
        }
    }, []);
    var updateGameType = function (type) {
        setGameType(type);
    };
    var handleNavigate = function (page, gameTypeParam) {
        if (typeof window !== 'undefined') {
            window.location.hash = gameTypeParam ? "".concat(page, ":").concat(gameTypeParam) : page;
        }
    };
    var handleAnswerQuestion = function (correct, points) {
        setCurrentScore(function (prevScore) { return prevScore + points; }); // Update the score
        setCorrect(correct); // Store whether the answer was correct
        setPoints(points); // Store the points earned
    };
    var handlePlayerName = function (name) {
        setPlayerName(name);
    };
    var renderPage = function () {
        if (status === 'loading') {
            return <div>Loading...</div>;
        }
        switch (currentPage) {
            case 'start':
                return <StartPage_1.default onNavigate={handleNavigate} user={user} socket={socket} handlePlayerName={handlePlayerName}/>;
            case 'join':
                return <JoinPage_1.default onNavigate={handleNavigate} user={user} socket={socket}/>;
            case 'create-quiz':
                return <CreateQuizPage_1.default onNavigate={handleNavigate} user={user}/>;
            case 'create-category':
                return <CreateCategoryPage_1.default onNavigate={handleNavigate} user={user}/>;
            case 'edit-subscription':
                return <SubscriptionPage_1.default onNavigate={handleNavigate} user={user}/>;
            case 'chooseGame':
                return <ChooseGamePage_1.default onNavigate={handleNavigate} user={user} setGameType={updateGameType}/>;
            case 'joinQuizResponse':
                return <JoinedQuizResponsePage_1.default onNavigate={handleNavigate} user={user} quizName={quiz === null || quiz === void 0 ? void 0 : quiz.name}/>;
            case 'choose-category':
                return <ChooseCategoryPage_1.default onNavigate={handleNavigate} user={user} gameType={gameType} socket={socket}/>;
            case 'profile':
                return <ProfilePage_1.default onNavigate={handleNavigate} user={user}/>;
            case 'loadingPage':
                return <LoadingPage_1.default onNavigate={handleNavigate} user={user} socket={socket} loadingText={gameType === 'GuessWho' ? 'Waiting for all Players to finsih the statements' : 'Loading, please wait...'}/>;
            case 'QuestionAnswerPage':
                return <QuestionAnswerPage_1.default onNavigate={handleNavigate} socket={socket} questions={questions} playerName={playerName !== null && playerName !== void 0 ? playerName : ''}/>;
            case 'QuizQuestionPage':
                return <QuizQuestionPage_1.default statements={finalStatements} socket={socket} onNavigate={handleNavigate}/>;
            case 'QuestionGuessPage':
                return <QuestionGuessPage_1.default socket={socket} onNavigate={handleNavigate} handleAnswerQuestion={handleAnswerQuestion}/>;
            case 'AnswerResponsePage':
                return <AnswerResponsePage_1.default correct={correct} points={points} currentScore={currentScore}/>;
            case 'AnswerToSlow':
                return <AnswerToSlowPage_1.default currentScore={currentScore}/>;
            case 'quizRankingPage':
                return <QuizRankingPage_1.default rankings={rankings}/>; // Pass rankings as a prop
            case 'quizStatsPage':
                return <QuizStatsPage_1.default statsData={statsData} onNavigate={handleNavigate}/>;
            default:
                return <StartPage_1.default onNavigate={handleNavigate} user={user} socket={socket} handlePlayerName={handlePlayerName}/>;
        }
    };
    return <div>{renderPage()}</div>;
};
exports.default = GameLogic;
