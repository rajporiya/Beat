import "dotenv/config";
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware} from '@clerk/express'
import userRoutes from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import stateRoutes from './routes/state.route.js'
import { connectDb } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from "cors"
import cookieParser from "cookie-parser"
import v1Routes from "./routes/v1.route.js"

dotenv.config()
const app = express()
const __dirname = path.resolve();
const PORT = process.env.PORT || 4561

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use(clerkMiddleware())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, "tmp"),
    createParentPath : true,
    limits : {
        fieldSize : 10 * 1024 * 1024, // max field size
        fileSize : 50 * 1024 * 1024, // max file size
    }
}))
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats", stateRoutes);
app.get("/api/v1/health", (_req, res) => res.status(200).json({ success: true, message: "Music API is running" }));
app.use("/api/v1", v1Routes);

app.use((err, req,res,next) =>{
    const status = err.status || 500;
    res.status(status).json({ success: false, message: status === 500 && process.env.NODE_ENV === "production" ? "Internal server error" : err.message, error: null });
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})
