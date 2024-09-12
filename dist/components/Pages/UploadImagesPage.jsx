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
var uploadImage_1 = __importDefault(require("../icons/uploadImage"));
var UploadImagesPage = function () {
    var _a = (0, react_1.useState)(false), isAnimating = _a[0], setIsAnimating = _a[1]; // State to control animation
    var _b = (0, react_1.useState)(false), success = _b[0], setSuccess = _b[1]; // State to control success animation
    // Function to handle button click
    var handleClick = function () {
        // Trigger the initial animation
        setIsAnimating(true);
        // Reset initial animation after 2 seconds and trigger success animation
        setTimeout(function () {
            setIsAnimating(false);
            setSuccess(true);
            // Stop success animation after 3 seconds
            setTimeout(function () { return setSuccess(false); }, 3000);
        }, 2000); // Initial animation duration
    };
    return (<section className="w-screen h-screen flex flex-col justify-center items-center bg-custom-purple relative overflow-hidden">
      <div className="text-center mb-40">
        <h1 className="font-SourceSansPro font-regular text-4xl text-white">1/3</h1>
        <h1 className="font-SourceSansPro mt-5 font-regular text-2xl text-white">Uploaded images</h1>
      </div>

      <button className={"mb-40 relative flex items-center justify-center w-40 h-40 ".concat(isAnimating ? 'animation-scale-pulse' : '')} onClick={handleClick}>
        <uploadImage_1.default />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={"block w-40 h-40 ".concat(success ? 'bg-quiz-green' : 'bg-custom-blue', " rounded-full")}></span>
        </div>
      </button>
    </section>);
};
exports.default = UploadImagesPage;
