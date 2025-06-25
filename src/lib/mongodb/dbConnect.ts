import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    // ✅ Use existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000, // Fail fast if cannot connect
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
