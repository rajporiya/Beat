import { clerkClient } from '@clerk/express'

export const protectRoute = async (req, res, next) =>{
    if(!req.auth.userId){
        return res.status(401).json({message: "unauthorized - You"})
    }
    next();
}

export const requireAdmin = async (req, res, next ) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const userEmail = currentUser.emailAddresses.find(e => e.id === currentUser.primaryEmailAddressId)?.emailAddress;
        const isAdmin = process.env.ADMIN_EMAIL?.trim().toLowerCase() === userEmail?.trim().toLowerCase();

        console.log("Admin Check:", {
            configuredAdminEmail: process.env.ADMIN_EMAIL,
            loggedInUserEmail: userEmail,
            isAdminMatch: isAdmin
        });

        if(!isAdmin){
            return res.status(403).json({message : "Unauthorized - you must be an admin"})
        }
        next();
    } catch (error) {
        next(error)
    }
}