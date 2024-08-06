// models/player.ts
import { Schema, model, models, Document, Model } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  score?: number;
  wins?: number;
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

const Player: Model<IPlayer> = models.Player || model<IPlayer>('Player', PlayerSchema);

export default Player;
