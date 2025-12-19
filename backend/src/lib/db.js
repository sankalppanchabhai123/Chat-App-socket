import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connection successful: " + conn.connection.host);
    } catch (error) {
        console.log("Error Connecting the MongoDB: " + error);
    }
}
