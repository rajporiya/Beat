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

dotenv.config()
const app = express()
const __dirname = path.resolve();
const PORT = process.env.PORT || 4561

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json())
app.use(clerkMiddleware())

app.use(fileUpload({
    userTempFiles : true,
    tempFileDir : path.join(__dirname, "tmp"),
    createParentPath : true,
    limits : {
        fieldSize : 10 * 1024 * 1024 // max file size
    }
}))
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats ", stateRoutes);

app.use((err, req,res,next) =>{
    res.status(500).json ({message: process.env.NODE_ENV === "production" ? "internal error" : err.message})
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})
