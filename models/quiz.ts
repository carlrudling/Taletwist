// models/quiz.ts
import { Schema, model, models, Document, Model, Types } from 'mongoose';

export interface IPlayer {
  name: string;
  score: number;
  wins: number;
}

export interface IQuiz extends Document {
  joinCode: string;
  name: string;
  createdDate: Date;
  creatorId: Types.ObjectId;
  players: IPlayer[];
}

const PlayerSchema = new Schema<IPlayer>({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
});

const QuizSchema = new Schema<IQuiz>({
  joinCode: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now, // Default to the current date
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  players: {
    type: [PlayerSchema],
    default: [],
    validate: {
      validator: function (players: IPlayer[]) {
        const names = players.map(player => player.name);
        return names.length === new Set(names).size;
      },
      message: 'Player names must be unique within the quiz.',
    },
  },
});

const Quiz: Model<IQuiz> = models.Quiz || model<IQuiz>('Quiz', QuizSchema);

export default Quiz;
