"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var hotSeatIcon_1 = __importDefault(require("./icons/hotSeatIcon"));
var ExplainHotSeat = function () {
    return (<div className='flex flex-col items-center z-20'>
      <hotSeatIcon_1.default width='30%' height='30%'/>
      <p className='font-SourceSansPro text-center text-white mt-10 text-2xl'>
        The person in the seat needs to answer the question.
      </p>
    </div>);
};
exports.default = ExplainHotSeat;
