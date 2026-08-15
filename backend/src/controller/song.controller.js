import { Song } from "../models/song.models.js"

export const getAllSongs = async (req,res,next)=>{
    try {
        // -1 descending => newser -> oldest
        // 1 descending =>  oldest ->newser 
        const songs = await Song.find().sort({createdAt : -1})
    } catch (error) {
        
    }
}