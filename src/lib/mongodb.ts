import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vyomai_db";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached?.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached?.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 2500, // Fail fast (2.5s) if DNS SRV is blocked/timing out
      family: 4, // Prefer IPv4
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.warn("MongoDB Atlas connection warning:", e);
    return mongoose;
  }

  return cached!.conn;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
