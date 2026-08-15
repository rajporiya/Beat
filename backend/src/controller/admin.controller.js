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
    if (!req.files || !req.files.audioFile || !req.file.imageFile){
        return res.status(400).json({
            message : " plz upload all files"
        })
    }
    const   { title, artist, albumId, duration}= req.body
    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile
    const audioUrl = await uploadToCloudinary(audioFile)
    const imageURL = await uploadToCloudinary(audioFile)
    const song = new Song({
        title,
        artist,
        imageURL, 
        audioUrl,
        duration,
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
    console.log("errpr createSong", error);
    res.status(500).json({message: "internal server error create song", error})
    next(error)
   }
}

export const deleteSong = async (req,res, next) => {
    try {
        const { id } = req.params

        const song = await Song.findById(id)

        // if  song from album
        if(song.albymId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull : { songs : song._id},
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message : "Song deleted successfully"})
    } catch (error) {
        console.log("errro from deleter song", error);
        
        next(error)
    }
}

export const createAlbum  = async (req,res, next) => {
    try {
        const { title, artist, releaseYear}= req.body 
        const { imageFile} =req.files
        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
             artist,
             imageUrl,
             releaseYear
        })

        await album.save()
    } catch (error) {
        console.log("errro from create album", error);
        next(error)
    }
}

export const deleteAlbum = async (req,res, next) => {
    try {
        const { id } = req.body
        await Song.deleteMany({ albumId : id})
        await Album.findByIdAndDelete(id)

        res.status(200).json({message : "Album deleted successfully"})
    } catch (error) {
        console.log("errro from album song", error);
        next(error);
    }
}

export const checkAdmin = async (req,res,next) =>{
    res.status(200).json({admin:true})
}