import mongoose from "mongoose";

export default function connectDB() {
  const url = process.env.DB_URL;

  // verify the mongoDB URL
  if (!url) {
    console.error("MongoDB URL not found in environment variables.");
    process.exit(1);
  }

  try {
    mongoose.connect(url);
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log("Database connected");
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}
