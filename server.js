import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS: allow local frontend
app.use(cors({
  origin: "http://localhost:3000", // React default port
  credentials: true
}));

app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// Root
app.get("/", (req, res) => res.send("Expense Tracker API Running"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
