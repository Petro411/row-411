import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cached object to prevent multiple connections across hot reloads
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn; // ✅ Use existing connection

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      maxPoolSize: 50, // ⬆️ bigger pool for high concurrency
      minPoolSize: 5,  // ⬇️ keep a warm pool
      maxIdleTimeMS: 30000, // free idle connections faster
      serverSelectionTimeoutMS: 5000, // fail fast
      socketTimeoutMS: 60000, // allow long queries
      heartbeatFrequencyMS: 10000, // keep connection alive
      family: 4, // prefer IPv4 for faster DNS resolution
    };

    // ✅ Retry wrapper for resilience
    async function connectWithRetry(retries = 5, delay = 2000): Promise<typeof mongoose> {
      try {
        const conn = await mongoose.connect(MONGODB_URI, options);
        if (process.env.NODE_ENV !== "production") {
          console.log("✅ MongoDB connected");
        }
        return conn;
      } catch (err) {
        if (retries <= 0) {
          console.error("❌ MongoDB connection failed:", err);
          throw err;
        }
        console.warn(`⚠️ MongoDB connection failed. Retrying in ${delay / 1000}s... (${retries} left)`);
        await new Promise(res => setTimeout(res, delay));
        return connectWithRetry(retries - 1, delay * 2); // exponential backoff
      }
    }

    cached.promise = connectWithRetry();
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
