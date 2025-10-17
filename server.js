import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for your frontend domain
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://expense-tracker-5d1xl0txr-aarya-patel-s-projects.vercel.app" // vercel frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running...")
    );
  })
  .catch((err) => console.error("MongoDB Error:", err));
