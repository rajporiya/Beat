import mongoose from "mongoose";

const alnumSchema = new mongoose.Schema({
    titel :{
        type :String, 
        require : true,
    },
    artist :{
        type :String, 
        require : true,
    },
    imageUrl :{
        type :String, 
        require : true,
    },
    releaseYear :{
        type: Strind,
        requires: true,
    },
    songs:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "song"
        },
    ]
}, {timestamps: true})

export const Album = mongoose.model("Album", alnumSchema)