import { Schema, model, models, Document, Model, Types } from 'mongoose';

// Define the report reason options as an enum type
export type ReportCause = 
  | 'Harassment'
  | 'Hate Speech'
  | 'Inappropriate Content'
  | 'Spam'
  | 'Other';

// Define the type for a report
export interface IReport {
  cause: ReportCause;
  userId: Types.ObjectId;
  comment?: string; // Optional comment for additional context
}

export interface ICategory extends Document {
  name: string;
  description: string;
  createdBy: string; // 'user' or 'taletwist'
  creatorId?: Types.ObjectId;
  votes?: {
    count: number;
    userIds: Types.ObjectId[];
  };
  isPrivate: boolean;
  gameType: {
    name: string;
    id: Types.ObjectId;
  };
  tags: string[]; // Define tags as an array of strings
  reports?: IReport[];
  addVote: (userId: Types.ObjectId) => Promise<void>;
  hasVoted: (userId: Types.ObjectId) => boolean;
  addReport: (userId: Types.ObjectId, cause: ReportCause, comment?: string) => Promise<void>;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: String,
    enum: ['user', 'taletwist'],
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  votes: {
    type: {
      count: {
        type: Number,
        default: 0,
      },
      userIds: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
    },
    required: function() { return this.createdBy === 'user'; },
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  gameType: {
    name: {
      type: String,
      enum: ['GuessWho', 'HotSeat', 'Trivia', 'MostLikely'],
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  tags: {
    type: [String], // Define tags as an array of strings
    default: [],    // Default to an empty array
  },
  reports: [
    {
      cause: {
        type: String,
        enum: ['Harassment', 'Hate Speech', 'Inappropriate Content', 'Spam', 'Other'],
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
});

// Method to check if a user has already voted
CategorySchema.methods.hasVoted = function(userId: Types.ObjectId): boolean {
  return this.votes?.userIds.includes(userId) ?? false;
};

// Method to add a vote
CategorySchema.methods.addVote = async function(userId: Types.ObjectId): Promise<void> {
  if (!this.hasVoted(userId)) {
    this.votes.userIds.push(userId);
    this.votes.count += 1;
    await this.save();
  } else {
    throw new Error('User has already voted');
  }
};

// Method to add a report
CategorySchema.methods.addReport = async function(
  userId: Types.ObjectId, 
  cause: ReportCause, 
  comment?: string
): Promise<void> {
  if (!this.reports) {
    this.reports = [];
  }

  // Explicitly define the type of the report parameter
  const hasReported = this.reports.some((report: IReport) => 
    report.userId.equals(userId) && report.cause === cause
  );

  if (!hasReported) {
    this.reports.push({ userId, cause, comment });
    await this.save();
  } else {
    throw new Error('User has already reported this category for the same reason');
  }
};

// Method to add a tag (Optional)
CategorySchema.methods.addTag = function(tag: string): void {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
    this.save();
  }
};

// Method to remove a tag (Optional)
CategorySchema.methods.removeTag = function(tag: string): void {
  this.tags = this.tags.filter((t: string) => t !== tag);
  this.save();
};

const Category: Model<ICategory> = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
