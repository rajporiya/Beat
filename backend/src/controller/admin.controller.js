import {Song} from '../models/song.models.js'
import { Album } from '../models/album.models.js'
import { User } from '../models/user.models.js'
import cloudinary from '../lib/cludinary.js'

const uploadToCloudinary = async (file) =>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type : "auto"
        })
        return result.secure_url    
    } catch (error) {
        console.log("Error i uploadCloudinary ", error);
        throw new Error(`uploadCloudinary: ${error.message}`) 
    }
}

export const createSong = async (req,res, next) => {
   try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile){
        return res.status(400).json({
            message : "Please upload both an audio file and an image file"
        })
    }
    const { title, artist, albumId, duration }= req.body
    if(!title || !artist){
        return res.status(400).json({message : "Title and artist are required"})
    }
    const audioUrl = await uploadToCloudinary(req.files.audioFile)
    const imageUrl = await uploadToCloudinary(req.files.imageFile)
    const song = new Song({
        title,
        artist,
        imageUrl,
        audioUrl,
        duration: Number(duration) || 0,
        albumId: albumId || null
    })

    await song.save()
    if(albumId){
        await Album.findByIdAndUpdate(albumId,{
            $push : { songs : song._id},
        })
    }
    res.status(201).json(song)
   } catch (error) {
    console.log("error createSong", error.message);
    res.status(500).json({message: "Failed to create song", error: error?.message})
   }
}

export const deleteSong = async (req,res, next) => {
    try {
        const { id } = req.params

        const song = await Song.findById(id)
        if(!song){
            return res.status(404).json({message : "Song not found"})
        }

        // if  song from album
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull : { songs : song._id},
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message : "Song deleted successfully"})
    } catch (error) {
        console.log("error from delete song", error);
        
        next(error)
    }
}

export const createAlbum  = async (req,res, next) => {
    try {
        const { title, artist, releaseYear }= req.body 
        if(!title || !artist){
            return res.status(400).json({message : "Title and artist are required"})
        }
        let imageUrl = ""
        if (req.files?.imageFile){
            imageUrl = await uploadToCloudinary(req.files.imageFile)
        }
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear: Number(releaseYear) || new Date().getFullYear()
        })

        await album.save()
        res.status(201).json(album)
    } catch (error) {
        console.log("error from create album", error.message);
        res.status(500).json({message: "Failed to create album", error: error?.message})
    }
}

export const updateAlbum = async (req,res, next) => {
    try {
        const { id } = req.params
        const { title, artist, releaseYear } = req.body

        const album = await Album.findById(id)
        if(!album){
            return res.status(404).json({ message : "Album not found" })
        }
        if (title?.trim()) album.title = title.trim()
        if (artist?.trim()) album.artist = artist.trim()
        if (releaseYear) album.releaseYear = Number(releaseYear) || album.releaseYear
        if (req.files?.imageFile){
            album.imageUrl = await uploadToCloudinary(req.files.imageFile)
        }
        await album.save()

        const populated = await Album.findById(id).populate("songs")
        res.status(200).json(populated)
    } catch (error) {
        console.log("error from update album", error.message);
        res.status(500).json({ message: "Failed to update album", error: error?.message })
    }
}

export const addSongsToAlbum = async (req,res, next) => {
    try {
        const { id } = req.params
        const { songIds } = req.body

        const album = await Album.findById(id)
        if(!album){
            return res.status(404).json({ message : "Album not found" })
        }
        const ids = Array.isArray(songIds) ? songIds : []
        if(!ids.length){
            return res.status(400).json({ message : "songIds array is required" })
        }

        await Song.updateMany(
            { _id: { $in: ids } },
            { $set: { albumId: id } }
        )
        await Album.findByIdAndUpdate(id, { $addToSet: { songs: { $each: ids } } })

        const populated = await Album.findById(id).populate("songs")
        res.status(200).json(populated)
    } catch (error) {
        console.log("error add songs to album", error.message);
        res.status(500).json({ message: "Failed to add songs to album", error: error?.message })
    }
}

export const removeSongFromAlbum = async (req,res, next) => {
    try {
        const { id, songId } = req.params

        const album = await Album.findById(id)
        if(!album){
            return res.status(404).json({ message : "Album not found" })
        }
        await Album.findByIdAndUpdate(id, { $pull: { songs: songId } })
        await Song.findByIdAndUpdate(songId, { $set: { albumId: null } })

        const populated = await Album.findById(id).populate("songs")
        res.status(200).json(populated)
    } catch (error) {
        console.log("error remove song from album", error.message);
        res.status(500).json({ message: "Failed to remove song from album", error: error?.message })
    }
}

export const deleteAlbum = async (req,res, next) => {
    try {
        const { id } = req.params
        await Song.deleteMany({ albumId : id})
        await Album.findByIdAndDelete(id)

        res.status(200).json({message : "Album deleted successfully"})
    } catch (error) {
        console.log("error from album song", error.message);
        next(error);
    }
}

export const getArtists = async (req,res, next) => {
    try {
        const artists = await Song.aggregate([
            {
                $unionWith: {
                    coll : "albums",
                    pipeline : [],
                }
            },
            {
                $match: {
                    artist: { $type: "string", $ne: "" },
                }
            },
            {
                $group: {
                    _id: "$artist",
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        res.status(200).json(artists.map((item) => item._id))
    } catch (error) {
        console.log("error from get artists", error.message);
        next(error)
    }
}

export const getUsers = async (req,res, next) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (error) {
        console.log("error from get users", error.message);
        next(error)
    }
}

export const deleteArtist = async (req,res, next) => {
    try {
        const { name } = req.params
        const artistName = decodeURIComponent(name)

        const songs = await Song.find({ artist: artistName })
        const songIds = songs.map((song) => song._id)

        await Promise.all([
            Album.updateMany({ songs: { $in: songIds } }, { $pull: { songs: { $in: songIds } } }),
            Song.deleteMany({ artist: artistName }),
            Album.deleteMany({ artist: artistName }),
        ])

        res.status(200).json({ message: "Artist deleted successfully" })
    } catch (error) {
        console.log("error from delete artist", error.message);
        next(error)
    }
}

export const checkAdmin = async (req,res,next) =>{
    res.status(200).json({admin:true})
}