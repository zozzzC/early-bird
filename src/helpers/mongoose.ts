import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = null;
}

export default async function dbConnect() {
  let uri = process.env.MONGODB_URI;
  if (process.env.NODE_ENV !== "production") {
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
  }

  if (uri !== undefined) {
    if (cached == null) {
      cached = await mongoose.connect(uri);
    } else {
      return cached;
    }
  } else {
    throw new Error("Need to specify MongoDB URI for production.");
  }
}
