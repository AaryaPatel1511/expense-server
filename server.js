import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS setup for both local + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // if you run frontend locally (CRA)
      "http://localhost:5173", // if you use Vite
      "https://expense-tracker-8s3669o5x-aarya-patel-s-projects.vercel.app", // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect MongoDB Atlas (Serverless)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker Backend is Running Successfully!");
});

// ✅ Run server (for localhost)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`🚀 Server running locally on port ${PORT}`)
  );
}

export default app; // ✅ required for Vercel deployment
