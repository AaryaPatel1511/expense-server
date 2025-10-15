import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = 5000; // fixed port for local use

// ✅ CORS setup (only for localhost frontend)
app.use(
  cors({
    origin: "http://localhost:3000", // your React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Local or Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully (Local)"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker Backend is Running on VS Code (Local)!");
});

// ✅ Run local server
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});
