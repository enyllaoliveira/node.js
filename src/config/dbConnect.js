import mongoose from "mongoose";

async function connectDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connect;
}

export default connectDatabase;
