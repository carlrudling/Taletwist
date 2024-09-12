"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/20/solid");
var Dropdown = function (_a) {
    var selectedSubject = _a.selectedSubject, setSelectedSubject = _a.setSelectedSubject;
    var handleMenuItemClick = function (value) {
        setSelectedSubject(value);
    };
    return (<react_2.Menu as="div" className="relative inline-block text-left">
      <div>
        <react_2.MenuButton className="inline-flex w-full justify-between gap-x-1.5 font-SourceSansPro rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedSubject}
          <solid_1.ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400"/>
        </react_2.MenuButton>
      </div>

      <react_2.MenuItems transition className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          <react_2.MenuItem>
            {function (_a) {
            var active = _a.active;
            return (<button onClick={function () { return handleMenuItemClick('New Feature'); }} className={"block w-full text-left font-SourceSansPro px-4 py-2 text-sm ".concat(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                New Feature
              </button>);
        }}
          </react_2.MenuItem>
          <react_2.MenuItem>
            {function (_a) {
            var active = _a.active;
            return (<button onClick={function () { return handleMenuItemClick('Bug'); }} className={"block w-full text-left font-SourceSansPro px-4 py-2 text-sm ".concat(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                Bug
              </button>);
        }}
          </react_2.MenuItem>
          <react_2.MenuItem>
            {function (_a) {
            var active = _a.active;
            return (<button onClick={function () { return handleMenuItemClick('Other'); }} className={"block w-full text-left px-4 py-2 font-SourceSansPro text-sm ".concat(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                Other
              </button>);
        }}
          </react_2.MenuItem>
        </div>
      </react_2.MenuItems>
    </react_2.Menu>);
};
exports.default = Dropdown;
