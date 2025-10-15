import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();

// ✅ Use port provided by Render/Vercel OR fallback for local
const PORT = process.env.PORT || 5000;

// ✅ CORS setup for both environments
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local frontend
      "https://expense-tracker-2ntjf5nqm-aarya-patel-s-projects.vercel.app", // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// ✅ Root route (for Render/Vercel testing)
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker Backend is Running Successfully!");
});

// ✅ Start server (only for local use)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
}

export default app; // Required for serverless (Vercel/Render)
