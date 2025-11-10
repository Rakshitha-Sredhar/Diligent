import mongoose from 'mongoose';
import env from './env.js';

mongoose.set('strictQuery', true);

export async function connectToDatabase() {
  if (!env.mongoUri) {
    throw new Error('Missing MongoDB connection string. Set MONGODB_URI.');
  }

  await mongoose.connect(env.mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || undefined
  });

  return mongoose.connection;
}

export default mongoose;

