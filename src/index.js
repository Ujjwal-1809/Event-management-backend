import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./lib/db.js";
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config(); // Load environment variables

const app = express();
// Middleware
app.use(
    cors({
        origin: "https://67a76406343ba20008e60f42--astounding-travesseiro-bca374.netlify.app",
        credentials: true,
      })
);
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb()
});
