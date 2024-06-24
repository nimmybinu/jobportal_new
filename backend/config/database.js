import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("db connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
export default connectDB;
