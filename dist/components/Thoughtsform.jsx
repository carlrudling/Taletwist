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
var ideaIcon_1 = __importDefault(require("./icons/ideaIcon"));
var Dropdown_1 = __importDefault(require("./Dropdown"));
var Thoughtsform = function () {
    var _a = (0, react_1.useState)(true), showFirstForm = _a[0], setShowFirstForm = _a[1];
    var _b = (0, react_1.useState)('Subject'), selectedSubject = _b[0], setSelectedSubject = _b[1]; // Default value for dropdown
    var _c = (0, react_1.useState)(''), message = _c[0], setMessage = _c[1]; // State to store the message
    var handleFormToggle = function (showFirst) {
        setShowFirstForm(showFirst);
    };
    return (<div>
      {showFirstForm ? (<div className='flex flex-col thoughts_card '>
          <h3 className='text-xl font-poppins font-bold text-black'>
            Please share
          </h3>
          <p className='font-SourceSansPro font-regular text-base mr-15'>
            We are a small team and in order to make Taletwist as good and fun as possible as well keep getting better we need <span className='font-bold'>your thoughts</span> and <span className='font-bold'>ideas.</span>
          </p>

          <div className='flex flex-row justify-end'>
            <div className='flex flex-col gap-y-5 items-center'>
              <ideaIcon_1.default width='100%' height='100%'/>
              <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded self-end' onClick={function () { return handleFormToggle(false); }}>
                Share
              </button>
            </div>
          </div>
        </div>) : (<div className='flex flex-col thoughts_card '>        
          <h3 className='text-xl font-poppins font-medium text-black'>
            Ideas, bugs, thoughts?<br />
            <span className='font-bold'>Please share!</span>
          </h3>
          <Dropdown_1.default selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
          <textarea className='mt-4 p-2 border rounded-md font-SourceSansPro font-regular resize-none focus:outline-none focus:ring-0 h-40' // Adjust the height here
         placeholder='Write your message here...' value={message} onChange={function (e) { return setMessage(e.target.value); }}/>
          <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded mt-4 self-end'>
            Submit
          </button>
        </div>)}
    </div>);
};
exports.default = Thoughtsform;
