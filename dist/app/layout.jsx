"use strict";
// RootLayout.tsx
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@/styles/globals.css");
var head_1 = __importDefault(require("next/head"));
var SessionProvider_1 = __importDefault(require("@/app/provider/SessionProvider"));
var QuizProvider_1 = require("@/app/provider/QuizProvider"); // Import the QuizProvider
var RootLayout = function (_a) {
    var children = _a.children;
    return (<html lang="en">
      <head_1.default>
        <title>Promptopia</title>
        <meta name="description" content="Discover & Share AI Prompts"/>
      </head_1.default>
      <body>
        <SessionProvider_1.default>
          <QuizProvider_1.QuizProvider> {/* Wrap children in QuizProvider */}
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">{children}</main>
          </QuizProvider_1.QuizProvider>
        </SessionProvider_1.default>
      </body>
    </html>);
};
exports.default = RootLayout;
