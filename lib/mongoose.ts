/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cv-builder";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in environment");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log(`🔌 Connecting to MongoDB: ${MONGODB_URI}`);

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "cv-builder",
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000, // 10s
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

(global as any).mongoose = cached;
