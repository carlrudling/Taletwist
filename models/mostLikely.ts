import { Schema, model, models, Document, Model } from 'mongoose';

export interface IMostLikelyQuestion {
  question: string;
}

export interface IMostLikely extends Document {
  questions: IMostLikelyQuestion[];
}

const MostLikelySchema = new Schema<IMostLikely>({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
    },
  ],
});

const MostLikely: Model<IMostLikely> = models.MostLikely || model<IMostLikely>('MostLikely', MostLikelySchema);

export default MostLikely;
