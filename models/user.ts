import { Schema, model, models, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
  votes: number;
  subscriptionId?: string;  // Optional reference to Subscription model
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Updated regex to be more general
      },
      message: (props: any) => `${props.value} is not a valid email!`
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
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: false,
  }
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
