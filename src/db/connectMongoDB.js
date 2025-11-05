import mongoose from 'mongoose';

export async function connectMongoDB() {
  try {
    const mongoURL = process.env.MONGO_URL;

    await mongoose.connect(mongoURL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}
