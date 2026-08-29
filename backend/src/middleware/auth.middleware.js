import { clerkClient } from '@clerk/express'

export const protectRoute = async (req, res, next) =>{
    if(!req.auth.userId){
        // Never print the token itself. This tells us whether the browser sent
        // one and whether Clerk could validate it.
        console.warn("Protected request rejected", {
            path: req.originalUrl,
            hasBearerToken: /^Bearer\s+.+/i.test(req.headers.authorization || ""),
            clerkUserId: req.auth.userId || null,
        });
        return res.status(401).json({
            message: "unauthorized - You",
            reason: /^Bearer\s+.+/i.test(req.headers.authorization || "")
                ? "Clerk could not validate the session token"
                : "No session token was received by the API",
        })
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
