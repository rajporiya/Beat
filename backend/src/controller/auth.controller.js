import { Song } from "../models/song.models.js";
import { User } from "../models/user.models.js";

export const authCallback = async (req, res, next)=>{
    try {
        const { id, firstName, lastName, imageUrl} = req.body;

        const user = await User.findOne({ clerkId : id})

        if(!user){
            await User.create({
                clerkId : id,
                fullName : `${firstName} ${lastName}`,
                imageUrl
            })
        }

        res.status(200).json ({
            success : true
        })
    } catch (error) {
        console.log("Error in auth ", error);
        next()
        
    }
}

export const getFearuresSogs = async (req, res, next)=>{
    try {
        // 6 song fetch 
        const songs = await Song.aggregate([
            {
                $sample : { size : 6}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        
    }
}
export const getMadeForYou = async (req, res, next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        
    }
}
export const getTrending = async (req, res, next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        
    }
}