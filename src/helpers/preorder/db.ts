import mongoose, { Connection } from "mongoose";

let conn: Connection | null = null;

export async function connect() {
  if (conn) {
    return conn;
  } else {
    try {
      const cnx = await mongoose.connect(process.env.MONGODB_URI as string);
      conn = cnx.connection;
      return conn;
    } catch (err) {
      throw err;
    }
  }
}
