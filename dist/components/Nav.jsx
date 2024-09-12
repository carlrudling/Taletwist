"use strict";
"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("next-auth/react");
var Nav = function (_a) {
    var onNavigate = _a.onNavigate;
    var session = (0, react_2.useSession)().data;
    var _b = (0, react_1.useState)(null), providers = _b[0], setProviders = _b[1];
    var _c = (0, react_1.useState)(false), toggleDropdown = _c[0], setToggleDropdown = _c[1];
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_2.getProviders)()];
                    case 1:
                        res = _a.sent();
                        setProviders(res);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var handleSignOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, react_2.signOut)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<nav className='flex-between w-full mb-16 pt-3 z-50'>
      <button onClick={function () { return onNavigate('start'); }} className='flex gap-2 flex-center'>
        <p className='logo_text'>Taletwist</p>
      </button>
      <div className='sm:flex hidden'>
        {(session === null || session === void 0 ? void 0 : session.user) ? (<div className='flex gap-3 md:gap-5'>
            <button onClick={function () { return onNavigate('create-category'); }} className='white_round_btn'>
              + Category
            </button>
            <button onClick={function () { return onNavigate('create-quiz'); }} className='white_round_btn'>
              Create Quiz
            </button>
            <button type='button' onClick={handleSignOut} className='black_round_btn'>
              Sign Out
            </button>
            <button onClick={function () { return onNavigate('profile'); }}>
              <img src={session.user.image} width={37} height={37} className='rounded-full mr-5' alt='profile'/>
            </button>
          </div>) : (providers && Object.values(providers).map(function (provider) { return (<button type='button' key={provider.name} onClick={function () { return (0, react_2.signIn)(provider.id); }} className='white_round_btn'>
              Sign in
            </button>); }))}
      </div>
      <div className='sm:hidden flex relative'>
        {(session === null || session === void 0 ? void 0 : session.user) ? (<div className='flex'>
            <img src={session.user.image} width={37} height={37} className='rounded-full mr-3' alt='profile' onClick={function () { return setToggleDropdown(!toggleDropdown); }}/>
            {toggleDropdown && (<div className='dropdown'>
                <button onClick={function () { setToggleDropdown(false); onNavigate('profile-page'); }} className='dropdown_link'>
                  My Profile
                </button>
                <button onClick={function () { setToggleDropdown(false); onNavigate('create-prompt'); }} className='dropdown_link'>
                  Create Prompt
                </button>
                <button onClick={function () { setToggleDropdown(false); onNavigate('create-category'); }} className='dropdown_link'>
                  + Category
                </button>
                <button type='button' onClick={function () { setToggleDropdown(false); handleSignOut(); }} className='w-full black_round_mobile_btn'>
                  Sign Out
                </button>
              </div>)}
          </div>) : (providers && Object.values(providers).map(function (provider) { return (<button type='button' key={provider.name} onClick={function () { return (0, react_2.signIn)(provider.id); }} className='white_round_btn'>
              Sign in
            </button>); }))}
      </div>
    </nav>);
};
exports.default = Nav;
