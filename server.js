import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for your frontend
app.use(cors({
  origin: "https://expense-tracker-jiseozimj-aarya-patel-s-projects.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies if needed
}));

// Parse JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Root route for browser testing
app.get("/", (req, res) => res.send("Backend is running"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
