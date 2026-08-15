import { clerkClient } from '@clerk/express'

export const protectRoute = async (req, res, next) =>{
    if(!req.auth.userId){
        req.status(401).json({message: "unauthorized - You"})
    }
    next();
}

export const requireAdmin = async (req, res, next ) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin  = process.env.ADMIN_EMAIL  === currentUser.primaryEmailAddress?.emailAddress

        if(!isAdmin){
            req.status(403).json({messaage : "Unauthorized - you must be an admin"})
        }
    } catch (error) {
        // return res.status(500).json({message : "Internal server error- auth middleware requireAdmin", error})
        next(error)
    }
}