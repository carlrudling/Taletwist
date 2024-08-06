import { Schema, model, models, Document, Model } from 'mongoose';

export interface ITriviaQuestion {
  question: string;
  rightAnswer: string;
  falseAnswer1: string;
  falseAnswer2: string;
  falseAnswer3: string;
}

export interface ITrivia extends Document {
  questions: ITriviaQuestion[];
}

const TriviaQuestionSchema = new Schema<ITriviaQuestion>({
  question: { type: String, required: true },
  rightAnswer: { type: String, required: true },
  falseAnswer1: { type: String, required: true },
  falseAnswer2: { type: String, required: true },
  falseAnswer3: { type: String, required: true },
});

const TriviaSchema = new Schema<ITrivia>({
  questions: {
    type: [TriviaQuestionSchema],
    required: true,
  },
});

const Trivia: Model<ITrivia> = models.Trivia || model<ITrivia>('Trivia', TriviaSchema);

export default Trivia;
