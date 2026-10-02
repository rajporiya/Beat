import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMyProfile, updateMyProfile, uploadMyAvatar, syncMyProfile, logoutUser } from "../controller/user.controller.js";
const router = Router()

// Profile routes must be declared before the generic "/" route
router.post('/logout', protectRoute, logoutUser)
router.post('/sync', protectRoute, syncMyProfile)
router.get('/me', protectRoute, getMyProfile)
router.patch('/me', protectRoute, updateMyProfile)
router.post('/avatar', protectRoute, uploadMyAvatar)

router.get('/' , protectRoute, getAllUsers)

export default router