import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong, updateAlbum, addSongsToAlbum, removeSongFromAlbum, getArtists, getUsers, deleteArtist } from "../controller/admin.controller.js";

const router = Router()
router.use(protectRoute, requireAdmin)
router.get("/check", checkAdmin)
router.get("/artists", getArtists)
router.get("/users", getUsers)

router.post('/songs' , createSong)
router.delete('/songs/:id' , deleteSong)

router.post('/albums' , createAlbum)
router.put('/albums/:id' , updateAlbum)
router.delete('/albums/:id' , deleteAlbum)
router.post('/albums/:id/songs' , addSongsToAlbum)
router.delete('/albums/:id/songs/:songId' , removeSongFromAlbum)
router.delete('/artists/:name' , deleteArtist)

export default router   