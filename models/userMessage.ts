import { Schema, model, models, Document, Model, Types } from 'mongoose';

export interface IUserMessage extends Document {
  subject: string; 
  message: string;
  creatorId?: Types.ObjectId;

}

const UserMessageSchema = new Schema<IUserMessage>({
  subject: {
    type: String,
    enum: ['newFeature', 'bug', 'other'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const UserMessage: Model<IUserMessage> = models.UserMessage || model<IUserMessage>('UserMessage', UserMessageSchema);

export default UserMessage;
