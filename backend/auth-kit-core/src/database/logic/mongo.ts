import mongoose from 'mongoose';
import { config } from '@database/config';
import { logger } from '@utils/logger';

const MONGO_URI = config.DB.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables.');
}

let isConnected = false;

export async function connectToMongoose(): Promise<void> {
  if (isConnected) return;

  try {
    mongoose.set('strictQuery', false); // optional, but recommended for future compatibility
    await mongoose.connect(MONGO_URI, {
      dbName: config.DB.MONGODB_NAME,
    });

    isConnected = true;
    logger.info('✅ Connected to MongoDB with Mongoose.');
  } catch (err) {
    logger.error('❌ Mongoose connection error:', err);
    throw err;
  }
}

// Optional helper for unit tests or graceful shutdown
export async function disconnectMongoose(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  logger.info('🔌 Disconnected from MongoDB.');
}
