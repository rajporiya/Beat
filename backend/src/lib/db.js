import mongoose from 'mongoose'

export const connectDb = async () =>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined')
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connect to mongoDb success db file ${conn.Connection}`);
        
    } catch (error) {
        console.log("failed to connect mongoDb db file", error);
        
    }
}
