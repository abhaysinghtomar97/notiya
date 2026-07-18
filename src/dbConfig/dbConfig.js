import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Global variable preserves the connection across Next.js Hot Module Replacement (HMR)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const ConnectDb = async () => {
  // 1. If we already have a connection, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If a connection is currently being established, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // Fail fast (15s) instead of hanging for 60s
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }

  return cached.conn;
};

export default ConnectDb;