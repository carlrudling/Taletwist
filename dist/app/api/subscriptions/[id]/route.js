"use strict";
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
exports.GET = GET;
exports.PUT = PUT;
exports.DELETE = DELETE;
var server_1 = require("next/server");
var database_1 = __importDefault(require("@/utils/database"));
var subscription_1 = __importDefault(require("@/models/subscription"));
// Connect to the database
(0, database_1.default)();
// Function to handle GET requests to fetch a subscription by ID
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var id, subscription, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = params.id;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, subscription_1.default.findById(id)];
                case 2:
                    subscription = _c.sent();
                    if (!subscription) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, data: subscription }, { status: 200 })];
                case 3:
                    error_1 = _c.sent();
                    console.error('Error fetching subscription:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error fetching subscription' }, { status: 400 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to handle PUT requests to update a subscription by ID
function PUT(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var id, body, subscription, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = params.id;
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, subscription_1.default.findByIdAndUpdate(id, body, {
                            new: true,
                            runValidators: true,
                        })];
                case 3:
                    subscription = _c.sent();
                    if (!subscription) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, data: subscription }, { status: 200 })];
                case 4:
                    error_2 = _c.sent();
                    console.error('Error updating subscription:', error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error updating subscription' }, { status: 400 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to handle DELETE requests to delete a subscription by ID
function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var id, deletedSubscription, error_3;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = params.id;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, subscription_1.default.deleteOne({ _id: id })];
                case 2:
                    deletedSubscription = _c.sent();
                    if (deletedSubscription.deletedCount === 0) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ success: true, message: 'Subscription deleted successfully' }, { status: 200 })];
                case 3:
                    error_3 = _c.sent();
                    console.error('Error deleting subscription:', error_3);
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, message: 'Error deleting subscription' }, { status: 400 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
