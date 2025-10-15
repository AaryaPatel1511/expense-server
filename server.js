import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup (only for local React frontend)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker Backend Running Locally with MongoDB Atlas!");
});

// ✅ Start local server
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});
