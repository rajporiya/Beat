import { Song } from "../models/song.models.js";
import { User } from "../models/user.models.js";

export const authCallback = async (req, res, next)=>{
    try {
        const { id, firstName, lastName, imageUrl, email } = req.body;
        const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "User";

        const existing = await User.findOne({ clerkId: id });
        if (!existing) {
            await User.create({
                clerkId: id,
                fullName,
                imageUrl,
                email: email ? String(email).trim().toLowerCase() : `clerk_${id}@unknown.local`,
            });
        } else {
            const update = {};
            if (!existing.imageUrl && imageUrl) update.imageUrl = imageUrl;
            if (!existing.fullName && fullName) update.fullName = fullName;
            if (email && (!existing.email || existing.email.endsWith("@unknown.local"))) {
                update.email = String(email).trim().toLowerCase();
            }
            if (Object.keys(update).length > 0) {
                await User.updateOne({ clerkId: id }, { $set: update });
            }
        }

        res.status(200).json ({
            success : true
        })
    } catch (error) {
        console.log("Error in auth ", error);
        next(error)
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
        next(error)
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
        next(error)
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
        next(error)
    }
}
