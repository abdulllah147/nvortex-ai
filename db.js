const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Atlas connection (Vercel environment variable MONGODB_URI se connect hoga)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

// 1. User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    created_at: { type: Date, default: Date.now }
});

// 2. Chat Schema
const chatSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// 3. Message Schema
const messageSchema = new mongoose.Schema({
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    role: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', messageSchema);

// Server start aur Database connection
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

module.exports = app;