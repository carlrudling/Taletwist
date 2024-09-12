"use strict";
// context/QuizContext.tsx
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuizContext = exports.QuizProvider = void 0;
var react_1 = __importStar(require("react"));
// Create the context with default values
var QuizContext = (0, react_1.createContext)({
    selectedQuiz: null,
    setSelectedQuiz: function () { },
});
// Create a provider component
var QuizProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), selectedQuiz = _b[0], setSelectedQuiz = _b[1];
    return (<QuizContext.Provider value={{ selectedQuiz: selectedQuiz, setSelectedQuiz: setSelectedQuiz }}>
      {children}
    </QuizContext.Provider>);
};
exports.QuizProvider = QuizProvider;
// Create a custom hook to use the Quiz context
var useQuizContext = function () {
    return (0, react_1.useContext)(QuizContext);
};
exports.useQuizContext = useQuizContext;
