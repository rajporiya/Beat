import express from 'express'
import dotenv from 'dotenv'
import userRoutes from '../'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4561


application.React.use("/api/user", userRoutes());


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
