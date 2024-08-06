import { Schema, model, models, Document, Model } from 'mongoose';

export interface IStatement {
  statement: string;
}

export interface IGuessWho extends Document {
  statements: IStatement[];
}

const GuessWhoSchema = new Schema<IGuessWho>({
  statements: [
    {
      statement: {
        type: String,
        required: true,
      },
    },
  ],
});

const GuessWho: Model<IGuessWho> = models.GuessWho || model<IGuessWho>('GuessWho', GuessWhoSchema);

export default GuessWho;
