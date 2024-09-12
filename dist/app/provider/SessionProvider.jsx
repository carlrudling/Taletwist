"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("next-auth/react");
var Provider = function (_a) {
    var children = _a.children, session = _a.session;
    return (<react_1.SessionProvider session={session}>
    {children}
  </react_1.SessionProvider>);
};
exports.default = Provider;
