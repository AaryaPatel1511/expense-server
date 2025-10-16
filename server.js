// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/api/auth.js";
import transactionRoutes from "./routes/api/transactions.js";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: ["http://localhost:3000", "https://expense-tracker-omega-seven-13.vercel.app"],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// ✅ Health Check
app.get("/", (req, res) => res.send("Expense Tracker API Running"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
