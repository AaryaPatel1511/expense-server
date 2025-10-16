// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();
const app = express();

// ✅ CORS - allow localhost and Vercel frontend
app.use(cors({
  origin: [
    "http://localhost:3000", // local frontend
    "https://expense-tracker-client.vercel.app" // deployed frontend
  ],
  credentials: true
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("Expense Tracker API Running"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
