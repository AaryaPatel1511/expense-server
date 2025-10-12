import express from 'express';
import Transaction from '../models/Transaction.js';
import jwt from 'jsonwebtoken';


const router = express.Router();


// Auth middleware
const auth = (req, res, next) => {
const token = req.header('Authorization')?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch {
res.status(401).json({ message: 'Token is not valid' });
}
};


// Get all transactions
router.get('/', auth, async (req, res) => {
try {
const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
res.json(transactions);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Add transaction
router.post('/', auth, async (req, res) => {
try {
const { type, amount, description } = req.body;
const transaction = new Transaction({ userId: req.user.id, type, amount, description });
await transaction.save();
res.status(201).json(transaction);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


export default router;