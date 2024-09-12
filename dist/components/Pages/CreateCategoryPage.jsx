"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var react_1 = require("react");
var Nav_1 = __importDefault(require("../Nav"));
var pinkCircle_1 = __importDefault(require("../icons/pinkCircle"));
var CategoryCard_1 = __importDefault(require("../CategoryCard"));
var guessWhoIcon_1 = __importDefault(require("../icons/guessWhoIcon"));
var hotSeatIcon_1 = __importDefault(require("../icons/hotSeatIcon"));
var triviaIcon_1 = __importDefault(require("../icons/triviaIcon"));
var CreateCategoryPage = function (_a) {
    var onNavigate = _a.onNavigate, user = _a.user;
    var _b = (0, react_1.useState)(true), showFirstForm = _b[0], setShowFirstForm = _b[1];
    var _c = (0, react_1.useState)(''), categoryName = _c[0], setCategoryName = _c[1];
    var _d = (0, react_1.useState)([]), categoryTags = _d[0], setCategoryTags = _d[1];
    var _e = (0, react_1.useState)([{ question: '', answers: ['', '', '', ''] }]), questions = _e[0], setQuestions = _e[1];
    var _f = (0, react_1.useState)(false), isPrivate = _f[0], setIsPrivate = _f[1];
    var _g = (0, react_1.useState)(''), categoryType = _g[0], setCategoryType = _g[1];
    var _h = (0, react_1.useState)(''), description = _h[0], setDescription = _h[1];
    var _j = (0, react_1.useState)(false), formOkey = _j[0], setFormOkey = _j[1]; // State to track form validity
    var _k = (0, react_1.useState)([]), errorMessages = _k[0], setErrorMessages = _k[1]; // State to track validation errors
    var _l = (0, react_1.useState)(false), showErrorMessages = _l[0], setShowErrorMessages = _l[1]; // State to control the display of error messages
    // Update the example category to include tags and questionCount
    var category = {
        _id: '1',
        name: 'Childhood memories',
        votes: { count: 20, userIds: [] }, // Ensure votes is an object
        description: 'This is the very very very long description about the category',
        tags: ['memory', 'childhood', 'nostalgia'], // Example tags
        questionCount: 10, // Example question count
    };
    // Use useEffect to validate the form whenever a relevant state changes
    (0, react_1.useEffect)(function () {
        validateForm();
    }, [categoryName, categoryTags, categoryType, questions, description]);
    // Function to validate form fields
    var validateForm = function () {
        var errors = [];
        // Validate each form field and push an error message if validation fails
        if (categoryName.trim() === '') {
            errors.push('Category name is required.');
        }
        if (description.trim() === '') {
            errors.push('Description is required.');
        }
        if (description.length > 150) {
            errors.push('Description must not exceed 150 characters.');
        }
        if (categoryType === '') {
            errors.push('Category type must be selected.');
        }
        if (categoryTags.length < 3) {
            errors.push('Please enter at least 3 tags.');
        }
        if (!questions.every(function (q) { return q.question.trim() !== ''; })) {
            errors.push('All questions must be filled.');
        }
        if (categoryType === 'Trivia' && !questions.every(function (q) { var _a; return (_a = q.answers) === null || _a === void 0 ? void 0 : _a.every(function (a) { return a.trim() !== ''; }); })) {
            errors.push('All Trivia questions must have complete answers.');
        }
        setErrorMessages(errors);
        setFormOkey(errors.length === 0); // Update form validity
    };
    // Function to handle form submission
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var gameId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    validateForm(); // Validate the form on submission
                    // If form is not valid, show errors and return
                    if (!formOkey) {
                        setShowErrorMessages(true); // Display error messages if form is invalid
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, createGame()];
                case 2:
                    gameId = _a.sent();
                    if (!gameId) {
                        console.error('Failed to create game');
                        return [2 /*return*/];
                    }
                    // Then, create the category with the gameId and questions
                    return [4 /*yield*/, createCategory(gameId, questions.map(function (q) { return q.question; }))];
                case 3:
                    // Then, create the category with the gameId and questions
                    _a.sent(); // Pass questions array
                    // Reset form state after successful submission
                    resetForm();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error submitting form:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Function to create a game based on the category type
    var createGame = function () { return __awaiter(void 0, void 0, void 0, function () {
        var endpoint, payload, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = '';
                    payload = {};
                    // Set the endpoint and payload based on the selected category type
                    switch (categoryType) {
                        case 'GuessWho':
                            endpoint = '/api/games/guesswho';
                            payload = {
                                statements: questions.map(function (q) { return ({
                                    statement: q.question,
                                }); }),
                            };
                            break;
                        case 'HotSeat':
                            endpoint = '/api/games/hotseat';
                            payload = {
                                questions: questions.map(function (q) { return ({
                                    question: q.question,
                                }); }),
                            };
                            break;
                        case 'MostLikely':
                            endpoint = '/api/games/mostlikely';
                            payload = {
                                questions: questions.map(function (q) { return ({
                                    question: q.question,
                                }); }),
                            };
                            break;
                        case 'Trivia':
                            endpoint = '/api/games/trivia';
                            payload = {
                                questions: questions.map(function (q) { return ({
                                    question: q.question,
                                    rightAnswer: q.answers[0],
                                    falseAnswer1: q.answers[1],
                                    falseAnswer2: q.answers[2],
                                    falseAnswer3: q.answers[3],
                                }); }),
                            };
                            break;
                        default:
                            return [2 /*return*/, null];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.ok) {
                        console.log('Game Created:', data);
                        return [2 /*return*/, data.data._id]; // Return the created game ID
                    }
                    else {
                        console.error('Failed to create game:', data.message);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error creating game:', error_2);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Function to create a category
    var createCategory = function (gameId, questions) { return __awaiter(void 0, void 0, void 0, function () {
        var categoryData, response, responseData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryData = {
                        name: categoryName,
                        creatorId: user === null || user === void 0 ? void 0 : user.id,
                        createdBy: 'user', // Assuming categories are created by users
                        isPrivate: isPrivate,
                        description: description,
                        tags: categoryTags,
                        gameType: {
                            name: categoryType, // Use categoryType for gameType name
                            id: gameId, // Use the gameId returned from the game creation
                        },
                        questionCount: questions.length, // Correctly set the number of questions
                        votes: {
                            count: 0, // Initialize with default values
                            userIds: [], // Initialize with an empty array
                        },
                    };
                    console.log('Category Data:', categoryData); // Log the data for debugging
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/categories', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(categoryData), // Ensure correct data is being sent
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _a.sent();
                    if (response.ok) {
                        console.log('Category Created:', responseData);
                    }
                    else {
                        console.error('Failed to create category:', responseData.message);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error creating category:', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Function to reset form after successful submission
    var resetForm = function () {
        setCategoryName('');
        setCategoryTags([]);
        setQuestions([{ question: '', answers: ['', '', '', ''] }]);
        setIsPrivate(false);
        setCategoryType('');
        setDescription('');
        setFormOkey(false);
        setErrorMessages([]);
        setShowErrorMessages(false);
    };
    var handleQuestionChange = function (index, value) {
        var newQuestions = __spreadArray([], questions, true);
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };
    var handleAnswerChange = function (questionIndex, answerIndex, value) {
        var newQuestions = __spreadArray([], questions, true);
        newQuestions[questionIndex].answers[answerIndex] = value;
        setQuestions(newQuestions);
    };
    var handleAddQuestion = function () {
        setQuestions(__spreadArray(__spreadArray([], questions, true), [{ question: '', answers: ['', '', '', ''] }], false));
    };
    var handleRemoveQuestion = function (index) {
        var newQuestions = __spreadArray([], questions, true);
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };
    var handleCheckboxChange = function (game) {
        setCategoryType(game);
    };
    var handleFormToggle = function (showFirst) {
        setShowFirstForm(showFirst);
    };
    // Function to handle tag input change
    var handleTagsChange = function (event) {
        var tagsArray = event.target.value.split(',').map(function (tag) { return tag.trim(); });
        var filteredTags = tagsArray.filter(function (tag) { return tag !== ''; });
        setCategoryTags(filteredTags);
    };
    return (<section className="flex flex-col w-screen h-screen bg-custom-purple relative overflow-auto">
      <Nav_1.default onNavigate={onNavigate}/>

      {showFirstForm ? (<div className="flex flex-row self-start ml-4 lg:ml-20 mr-14 mb-40">
          <form className="create_quiz_form flex flex-col z-10 mb-2 justify-start">
            <h1 className="head_text text-left mb-10">Category</h1>
            <p className="font-sourceSansPro text-2xl font-regular mb-20 text-black">
              A category is a set of questions that you can play in different games.
            </p>
            <p className="font-poppins text-l font-bold mb-5 text-black">Example</p>
            <div className="self-start">
              <CategoryCard_1.default category={category} buttonLabel="Select" clickable={false}/>
            </div>
            <button className="purple_btn self-end mt-10" onClick={function () { return handleFormToggle(false); }}>
              Got it
            </button>
          </form>
        </div>) : (<div className="flex flex-row self-start ml-4 mr-14 mb-40 lg:ml-20">
          <form onSubmit={handleSubmit} className="create_quiz_form flex flex-col z-10 mb-2 justify-start">
            <h1 className="head_text text-left mb-10">Create Category</h1>
            <h3 className="mb-5 text-lg font-medium font-SourceSansPro text-gray-900">
              Which game do you want to create a category for?
            </h3>
            <ul className="grid w-full gap-6 md:grid-cols-3">
              <li>
                <input type="checkbox" id="guessWho-option" value="GuessWho" className="hidden peer" checked={categoryType === 'GuessWho'} onChange={function () { return handleCheckboxChange('GuessWho'); }}/>
                <label htmlFor="guessWho-option" className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                  <div className="block">
                    <guessWhoIcon_1.default width="40%" height="40%"/>
                    <div className="w-full text-lg font-SourceSansPro font-semibold">Guess Who</div>
                    <div className="w-full font-SourceSansPro text-sm">Finish statements and Guess Who it is.</div>
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" id="hotSeat-option" value="HotSeat" className="hidden peer" checked={categoryType === 'HotSeat'} onChange={function () { return handleCheckboxChange('HotSeat'); }}/>
                <label htmlFor="hotSeat-option" className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                  <div className="block">
                    <hotSeatIcon_1.default width="70" height="70"/>
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Hot Seat</div>
                    <div className="w-full font-SourceSansPro text-sm">Select questions, see who's in the Hot Seat.</div>
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" id="trivia-option" value="Trivia" className="hidden peer" checked={categoryType === 'Trivia'} onChange={function () { return handleCheckboxChange('Trivia'); }}/>
                <label htmlFor="trivia-option" className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                  <div className="block">
                    <triviaIcon_1.default width="70" height="70"/>
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Trivia</div>
                    <div className="w-full font-SourceSansPro text-sm">A classic Trivia with questions and answers.</div>
                  </div>
                </label>
              </li>

              <li>
                <input type="checkbox" id="mostLikely-option" value="MostLikely" className="hidden peer" checked={categoryType === 'MostLikely'} onChange={function () { return handleCheckboxChange('MostLikely'); }}/>
                <label htmlFor="mostLikely-option" className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                  <div className="block">
                    <triviaIcon_1.default width="70" height="70"/>
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Most Likely</div>
                    <div className="w-full font-SourceSansPro text-sm">Make questions and vote of who is most likely to do it.</div>
                  </div>
                </label>
              </li>
            </ul>

            <h3 className="mt-5 text-lg font-SourceSansPro mb-2 font-medium text-gray-900">Category information</h3>
            <input type="text" placeholder="Name for the Category" value={categoryName} onChange={function (e) { return setCategoryName(e.target.value); }} required className="search_input peer mb-5"/>

            <textarea placeholder="Enter a description of the category..." maxLength={150} // Limit the description to 150 characters
         className="w-full h-32 mb-2 p-4 border-2 search_input border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none" aria-label="Detailed information" value={description} onChange={function (e) { return setDescription(e.target.value); }}></textarea>
            <p className={"text-xs ".concat(description.length === 150 ? 'text-quiz-red' : 'text-gray-500', " mb-4")}>
              {description.length}/150 characters
            </p>

            {categoryType === 'GuessWho' ? (<p className="text-xs font-normal text-gray-500">Example statement: My favorite movie as a kid was...</p>) : categoryType === 'HotSeat' ? (<p className="text-xs font-normal text-gray-500 ">Example question: What is your biggest fear?</p>) : categoryType === 'Trivia' ? (<p className="text-xs font-normal text-gray-500 ">Example question: What is the population of Greenland?</p>) : categoryType === 'MostLikely' ? (<p className="text-xs font-normal text-gray-500 ">Example question: Who is most likely to choke on a job interview?</p>) : null}

            {questions.map(function (item, index) { return (<div key={index} className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder={"".concat(categoryType === 'GuessWho' ? 'Statement' : 'Question', " ").concat(index + 1)} value={categoryType === 'MostLikely'
                    ? "Who is most likely to ".concat(item.question)
                    : item.question} onChange={function (e) {
                    return handleQuestionChange(index, categoryType === 'MostLikely'
                        ? e.target.value.replace('Who is most likely to ', '')
                        : e.target.value);
                }} className="search_input peer flex-1"/>
                  <button type="button" onClick={function () { return handleRemoveQuestion(index); }} className="remove_btn">
                    Remove
                  </button>
                </div>
                {categoryType === 'Trivia' && (<div className="grid grid-cols-2 gap-2">
                    {item.answers.map(function (answer, answerIndex) { return (<input key={answerIndex} type="text" placeholder={answerIndex === 0 ? 'Correct answer' : 'Wrong answer'} value={answer} onChange={function (e) { return handleAnswerChange(index, answerIndex, e.target.value); }} className="search_input peer flex-1"/>); })}
                  </div>)}
              </div>); })}

            <button type="button" onClick={handleAddQuestion} className="add_btn">
              Add {categoryType === 'GuessWho' ? 'Statement' : 'Question'}
            </button>

            <p className="text-xs font-normal text-gray-500 ">Min 3 tags. Separate tags by commas</p>
            <input type="text" placeholder="Tags (e.g., fun, challenging, educational)" onChange={handleTagsChange} // Update the tags when input changes
         required className="search_input peer mb-5"/>

            <div className="flex mt-10">
              <div className="custom-checkbox flex items-center h-5">
                <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" checked={isPrivate} onChange={function () { return setIsPrivate(!isPrivate); }}/>
                <label htmlFor="helper-checkbox" className="ml-2"></label>
              </div>
              <div className="ms-2 text-sm">
                <label htmlFor="helper-checkbox" className="font-medium text-gray-900">
                  Make Category Private
                </label>
                <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500">
                  {' '}
                  By setting it to private no one else can get access to it.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <button className="font-poppins text-l self-end mt-10" onClick={function () { return handleFormToggle(true); }}>
                Back
              </button>

              <button className="purple_btn self-end mt-10" type="button" onClick={handleSubmit}>
                Create
              </button>
            </div>

            {/* Display validation error messages */}
            {showErrorMessages && errorMessages.length > 0 && (<div className="mt-4 text-sm text-red-600">
                {errorMessages.map(function (message, index) { return (<p key={index}>{message}</p>); })}
              </div>)}
          </form>
        </div>)}

      <div className="absolute top-20 left-0">
        <pinkCircle_1.default />
      </div>
    </section>);
};
exports.default = CreateCategoryPage;
