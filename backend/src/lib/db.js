import mongoose from 'mongoose'

export const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONDOBD_URL)
        console.log(`connect to mongoDb success db file ${conn.Connection}`);
        
    } catch (error) {
        console.log("failed to connect mongoDb db file", error);
        
    }
}