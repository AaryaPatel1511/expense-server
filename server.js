import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import cors from "cors";
app.use(cors({
  origin: "https://expense-tracker-omega-seven-13.vercel.app" 
  
}));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);


app.get("/", (req, res) => res.send("Expense Tracker API Running"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));