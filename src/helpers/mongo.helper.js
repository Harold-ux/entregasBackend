import { connect } from "mongoose";

async function connectToMongo() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("❌ MONGO_URL is not defined in environment variables.");
    }

    await connect(mongoUrl);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectToMongo;
