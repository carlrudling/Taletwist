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
var CategoryCard_1 = __importDefault(require("./CategoryCard")); // Adjust the import path as needed
var solid_1 = require("@heroicons/react/20/solid");
var CategoryCardList = function (_a) {
    var data = _a.data, onCategorySelect = _a.onCategorySelect, pressedCategory = _a.pressedCategory, handlePress = _a.handlePress;
    return (<div className='z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 mx-14'>
      {data.map(function (category) { return (<CategoryCard_1.default key={category._id} category={category} buttonLabel="Select" onButtonClick={function () { return handlePress(category._id); }} clickable={true} selected={pressedCategory === category._id} // Pass selected prop
        />); })}
    </div>);
};
var SearchCategory = function (_a) {
    var categories = _a.categories, onCategorySelect = _a.onCategorySelect;
    var _b = (0, react_1.useState)(""), searchText = _b[0], setSearchText = _b[1];
    var _c = (0, react_1.useState)(categories), searchedResults = _c[0], setSearchedResults = _c[1];
    var _d = (0, react_1.useState)(null), pressedCategory = _d[0], setPressedCategory = _d[1];
    (0, react_1.useEffect)(function () {
        setSearchedResults(categories.sort(function (a, b) { return b.votes.count - a.votes.count; })); // Sort categories by votes by default
    }, [categories]);
    // Function to filter categories based on search text
    var filterCategories = function (searchText) {
        var regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
        return categories.filter(function (category) {
            return regex.test(category.name) ||
                regex.test(category.description) ||
                category.tags.some(function (tag) { return regex.test(tag); });
        });
    };
    // Function to handle search input changes
    var handleSearchChange = function (e) {
        var searchValue = e.target.value;
        setSearchText(searchValue);
        if (!searchValue) {
            setSearchedResults(categories.sort(function (a, b) { return b.votes.count - a.votes.count; })); // Sort categories by votes if no search text
        }
        else {
            var filteredCategories = filterCategories(searchValue);
            setSearchedResults(filteredCategories);
        }
    };
    // Function to handle category selection
    var handlePress = function (categoryId) {
        setPressedCategory(categoryId);
        onCategorySelect(categoryId);
    };
    return (<section className="w-full z-10 flex flex-col items-center">
      <form className="relative flex items-center w-full max-w-md mb-4">
        <div className="relative flex items-center w-full">
          <solid_1.MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400"/>
          <input type="text" placeholder="Search for a category" value={searchText} onChange={handleSearchChange} required className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
      </form>

      <CategoryCardList data={searchedResults} onCategorySelect={onCategorySelect} pressedCategory={pressedCategory} handlePress={handlePress}/>
    </section>);
};
exports.default = SearchCategory;
