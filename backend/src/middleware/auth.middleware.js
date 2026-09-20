import { clerkClient, getAuth } from '@clerk/express'

export const protectRoute = async (req, res, next) =>{
    const { userId } = getAuth(req);
    if(!userId){
        console.warn("Protected request rejected", {
            path: req.originalUrl,
            hasBearerToken: /^Bearer\s+.+/i.test(req.headers.authorization || ""),
            clerkUserId: userId || null,
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
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "unauthorized - You" });
        }
        const currentUser = await clerkClient.users.getUser(userId);
        const userEmail = currentUser.emailAddresses.find(e => e.id === currentUser.primaryEmailAddressId)?.emailAddress?.trim().toLowerCase();
        const configuredEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean);
        const isAdmin = currentUser.publicMetadata?.role === "admin" || configuredEmails.includes(userEmail);

        if(!isAdmin){
            return res.status(403).json({message : "Unauthorized - you must be an admin"})
        }
        next();
    } catch (error) {
        next(error)
    }
}
