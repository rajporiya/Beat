import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import stateRoutes from './routes/state.route.js'
import { connectDb } from './lib/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4561

app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats ", stateRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})
