import mongoose from 'mongoose'

export const connectDb = async () =>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined')
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connect to mongoDb success db file ${conn.Connection}`);

        // Drop the stale unique index on imageUrl left over from an older schema.
        // It blocks user creation because every user without a photo has
        // imageUrl: null, and null values collide under the unique index.
        try {
            await conn.connection.collection("users").dropIndex("imageUrl_1");
            console.log("dropped stale users.imageUrl_1 index");
        } catch (indexError) {
            // IndexNotFound just means it's already gone — safe to ignore
            if (indexError?.codeName !== "IndexNotFound") {
                console.log("users index cleanup skipped", indexError?.message);
            }
        }
    } catch (error) {
        console.log("failed to connect mongoDb db file", error);
        
    }
}
