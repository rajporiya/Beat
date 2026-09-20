import { Album} from '../models/album.models.js'

export const createAlbum = async (req,res,next) =>{
    try {
        const userId = req.auth?.userId
        const { title, artist } = req.body
        if(!title?.trim()){
            return res.status(400).json({message : "Album name is required"})
        }
        const album = new Album({
            title : title.trim(),
            artist : artist?.trim() || "New Artist",
            imageUrl : "",
            releaseYear : new Date().getFullYear(),
            owner : userId || null,
        })
        await album.save()
        res.status(201).json(album)
    } catch (error) {
        next(error)
    }
}

export const getMyAlbums = async (req,res,next) =>{
    try {
        const userId = req.auth?.userId
        const albums = await Album.find({ owner: userId}).populate("songs").sort({createdAt : -1})
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}

export const getAllAlbum = async (req,res,next) =>{
    try {
        const album = await Album.find().sort({createdAt : -1})
        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}
export const getAlbumById = async (req,res,next) =>{
    try {
        const {albumId}=req.params
        const album = await Album.findById(albumId).populate("songs")

        if(!album){
            return res.status(400).json({message : "Album not found"})
        }

        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}