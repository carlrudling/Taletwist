"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("next-auth/react");
var votesIcon_1 = __importDefault(require("./icons/votesIcon"));
var CategoryCard = function (_a) {
    var category = _a.category, onButtonClick = _a.onButtonClick, _b = _a.buttonLabel, buttonLabel = _b === void 0 ? 'Select' : _b, _c = _a.clickable, clickable = _c === void 0 ? true : _c, _d = _a.selected, selected = _d === void 0 ? false : _d;
    var session = (0, react_1.useSession)().data;
    var defaultButtonClick = function () { };
    var handleClick = onButtonClick || defaultButtonClick;
    return (<div className={"category_card grid grid-rows-3 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ".concat(selected ? 'border-4 border-custom-orange' : 'border-2 border-white')}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-poppins font-bold text-black">
          {category.name}
        </h3>
        <div className="flex flex-row items-center justify-end">
          <votesIcon_1.default color="fill-quiz-green" width="16px" height="16px"/>
          <p className="text-black ml-1 text-sm text-sourceSansPro">
            {category.votes.count} votes
          </p>
        </div>
      </div>
      <div>
        <p className="text-black text-sourceSansPro text-sm overflow-hidden text-ellipsis">
          {category.description}
        </p>
        <p className="text-black text-sourceSansPro text-sm mt-2">
          {category.tags.map(function (tag) { return "#".concat(tag); }).join(' ')}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-black text-sm text-sourceSansPro">
          {category.questionCount} Questions
        </p>
        {clickable && (<button className="bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded self-end" onClick={handleClick}>
            {buttonLabel}
          </button>)}
      </div>
    </div>);
};
exports.default = CategoryCard;
