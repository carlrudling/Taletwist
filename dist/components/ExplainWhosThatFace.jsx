"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var uploadImage_1 = __importDefault(require("./icons/uploadImage"));
var whosthatface_1 = __importDefault(require("./icons/whosthatface"));
var ExplainWhosThatFace = function () {
    return (<div className='flex flex-col items-center z-20 space-y-16'>
      <p className='font-SourceSansPro text-center text-white text-2xl'>
                Everyone uploads images of themself 
      </p>

      <uploadImage_1.default />

      <p className='font-SourceSansPro text-center text-white text-2xl'>
                First to identify the person wins 
      </p>
    <whosthatface_1.default width='50%' height='50%'/>

    </div>);
};
exports.default = ExplainWhosThatFace;
