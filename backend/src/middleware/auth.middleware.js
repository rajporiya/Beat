import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const JWT_SECRET = process.env.JWT_SECRET || "beat_music_super_secure_jwt_secret_key_2026_spotify_clone";

export const protectRoute = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.replace(/^Bearer\s+/i, "");

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - You must be logged in",
                reason: "No authentication token was received",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id || decoded.sub;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - Account no longer exists",
            });
        }

        req.user = user;
        req.auth = { userId: user._id.toString() };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid or expired session",
            reason: error.message,
        });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - You must be logged in" });
        }

        const configuredEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean);

        const userEmail = req.user.email?.trim().toLowerCase();
        const isAdmin = req.user.role === "admin" || (userEmail && configuredEmails.includes(userEmail));

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }

        next();
    } catch (error) {
        next(error);
    }
};
