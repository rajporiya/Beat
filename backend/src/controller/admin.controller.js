import {Song} from '../models/song.models.js'
import { Album } from '../models/album.models.js'
import cloudinary from '../lib/cludinary.js'

const uploadToCloudinary = async (file) =>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type : "auto"
        })
        return result.secure_url    
    } catch (error) {
        console.log("Error i uploadCloudinary ", error);
        throw new Error("uploadCloudinary",errors)
        
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

export const checkAdmin = async (req,res,next) =>{
    res.status(200).json({admin:true})
}