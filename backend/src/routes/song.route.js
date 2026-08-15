import { Router } from "express";
import { getAllSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getFearuresSogs, getMadeForYou, getTrending } from "../controller/auth.controller.js";

const router = Router()

router.get('/' ,protectRoute,requireAdmin, getAllSongs)
router.get('/featured' ,getFearuresSogs)
router.get('/made-for-you', getMadeForYou)
router.get('/trendig', getTrending)

export default router