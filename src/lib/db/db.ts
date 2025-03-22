import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MongoDB connection string is not defined in environment variables");
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection"); // Debugging log
    return cached.conn;
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "Clerk-auth",
        bufferCommands: false,
        connectTimeoutMS: 30000,
      });

    cached.conn = await cached.promise;
    console.log("New MongoDB connection established"); // Debugging log

    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Debugging log
    throw new Error("Failed to connect to MongoDB");
  }
};
