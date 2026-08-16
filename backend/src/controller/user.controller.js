import { User } from "../models/user.models.js";

export const getAllUsers = async (req, res, next ) => {
    try {
        const currentUser = req.auth.userId()
        const users = await User.find({ clerkId : { $ne : currentUser}})
        req.status(200).json(users)

    } catch (error) {
        next(error)
    }
}