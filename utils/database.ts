import mongoose from 'mongoose';

let isConnected = false; // track the connection

const dbConnect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "Taletwist",
    } as mongoose.ConnectOptions);

    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default dbConnect;
