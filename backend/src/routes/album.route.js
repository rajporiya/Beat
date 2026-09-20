import { Router } from "express";
import { createAlbum, getAlbumById, getAllAlbum, getMyAlbums } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.get('/my' , protectRoute, getMyAlbums)
router.post('/' , protectRoute, createAlbum)
router.get('/' , getAllAlbum)
router.get('/:albumId' , getAlbumById)

export default router