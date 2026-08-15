import mongoose from 'mongoose'

export const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONDOBD_URL)
    } catch (error) {
        
    }
}