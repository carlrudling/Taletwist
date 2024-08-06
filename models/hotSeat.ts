import { Schema, model, models, Document, Model } from 'mongoose';

export interface IHotSeatQuestion {
  question: string;
}

export interface IHotSeat extends Document {
  questions: IHotSeatQuestion[];
}

const HotSeatSchema = new Schema<IHotSeat>({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
    },
  ],
});

const HotSeat: Model<IHotSeat> = models.HotSeat || model<IHotSeat>('HotSeat', HotSeatSchema);

export default HotSeat;
