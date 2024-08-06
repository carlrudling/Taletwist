import { Schema, model, models, Document, Model, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  validUntil: Date;
  lastPay: Date;
  type: string;  // e.g., 'premium'
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: {
    type: Schema.Types.ObjectId,
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
SubscriptionSchema.methods.isValid = function() {
  const currentDate = new Date();
  const gracePeriodEnd = new Date(this.validUntil);
  gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 7);
  return currentDate <= gracePeriodEnd;
};

// Method to update the validUntil date
SubscriptionSchema.methods.updateValidity = function(newValidUntil: Date) {
  this.validUntil = newValidUntil;
  this.lastPay = new Date();  // Update lastPay to now
  return this.save();
};

const Subscription: Model<ISubscription> = models.Subscription || model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
