import { Router } from "express";
import { getAlbumById, getAllAlbum } from "../controller/album.controller.js";

const router = Router()

router.get('/' , getAllAlbum)
router.get('/:albmId' , getAlbumById)

export default router   