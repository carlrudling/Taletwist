"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Updated regex to be more general
            },
            message: function (props) { return "".concat(props.value, " is not a valid email!"); }
        }
    },
    username: {
        type: String,
        required: true,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 8-20 alphanumeric letters and be unique!'],
    },
    image: {
        type: String,
    },
    votes: {
        type: Number,
        default: 0,
    },
    subscriptionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: false,
    }
});
var User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
