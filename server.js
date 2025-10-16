import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed Origins (Frontend URLs)
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://expense-tracker-pi-rouge.vercel.app", // your deployed frontend
];

// ✅ CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("Expense Tracker API Running"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
