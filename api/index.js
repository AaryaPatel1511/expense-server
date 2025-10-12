import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://expense-tracker-omega-seven-13.vercel.app"], // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Example route
app.get("/", (req, res) => {
    res.send("✅ Backend is live!");
  });
  
// Another example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

// Export app for Vercel
export default app;