/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in environment variables');
}

type MongooseGlobal = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};


declare global {
    var _mongoose: MongooseGlobal | undefined;
}

const globalWithMongoose = global as unknown as {
    _mongoose?: MongooseGlobal;
}

const cached = globalWithMongoose._mongoose ?? (globalWithMongoose._mongoose = { conn: null, promise: null});

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then(m => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}