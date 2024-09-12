"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SubscriptionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    validUntil: {
        type: Date,
        required: true,
    },
    lastPay: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['premium'],
        required: true,
    }
});
// Method to check if the subscription is still valid
SubscriptionSchema.methods.isValid = function () {
    var currentDate = new Date();
    var gracePeriodEnd = new Date(this.validUntil);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 7);
    return currentDate <= gracePeriodEnd;
};
// Method to update the validUntil date
SubscriptionSchema.methods.updateValidity = function (newValidUntil) {
    this.validUntil = newValidUntil;
    this.lastPay = new Date(); // Update lastPay to now
    return this.save();
};
var Subscription = mongoose_1.models.Subscription || (0, mongoose_1.model)('Subscription', SubscriptionSchema);
exports.default = Subscription;
