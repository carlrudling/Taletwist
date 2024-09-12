"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Nav_1 = __importDefault(require("../Nav"));
var votesIcon_1 = __importDefault(require("../icons/votesIcon"));
var pinkCircle_1 = __importDefault(require("../icons/pinkCircle"));
var CategoryCard_1 = __importDefault(require("../CategoryCard"));
var ProfilePage = function (_a) {
    var onNavigate = _a.onNavigate, user = _a.user;
    var _b = (0, react_1.useState)([]), categories = _b[0], setCategories = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        setLoading(true);
                        return [4 /*yield*/, fetch("/api/categories/creator/".concat(user.id))];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to fetch categories');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        setCategories(data.data);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        setError(err_1.message);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchCategories();
    }, [user === null || user === void 0 ? void 0 : user.id]);
    return (<section className="w-screen h-screen flex flex-col justify-start bg-custom-purple relative overflow-hidden">
      <Nav_1.default onNavigate={onNavigate}/>

      <div className='flex flex-row justify-between mt-8 mx-14'>
        <div className='z-20 flex flex-col'>
          <h1 className='quiz_name z-10 text-white'>
            My Profile
          </h1>
          <p className='text-white mt-10 text-xl font-SourceSansPro'>My Categories</p>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex flex-row items-center'>
            <votesIcon_1.default color='fill-quiz-green' width='16px' height='16px'/>
            <p className='font-SourceSansPro font-medium text-white text-xl ml-2'>
              {categories.reduce(function (acc, category) { return acc + category.votes.count; }, 0)} Votes
            </p>
          </div>
          <p className='text-white mt-2'>Subscription: None 😒</p>
        </div>
      </div>

      {/* Grid Container for Category Cards */}
      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-14">
        {loading && <p className="text-white col-span-full">Loading categories...</p>}
        {error && <p className="text-red-500 col-span-full">{error}</p>}
        {!loading && categories.length === 0 && !error && (<p className="text-white col-span-full">No categories found.</p>)}
        {categories.map(function (category) { return (<div key={category._id} className="mb-4">
            <CategoryCard_1.default category={category} buttonLabel="Edit" onButtonClick={function () { return onNavigate("edit-category?id=".concat(category._id)); }} clickable={true}/>
          </div>); })}
      </div>

      <button className='absolute bottom-4 right-4 rounded bg-white text-l py-1.5 px-5 text-custom-purple transition-all text-center font-poppins font-medium border hover:bg-custom-orange hover:border-black hover:text-white z-10' onClick={function () { return onNavigate('edit-subscription'); }}>
        Edit Subscription
      </button>

      <div className="absolute top-20 left-0 ">
        <pinkCircle_1.default />
      </div>
    </section>);
};
exports.default = ProfilePage;
