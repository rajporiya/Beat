import { User } from "../models/user.models.js";
import cloudinary from "../lib/cludinary.js";

const getUserId = (req) => req.user?._id?.toString() || req.auth?.userId;

const placeholderEmail = (clerkUserId) => `clerk_${clerkUserId}@unknown.local`;

// Create or sync the local user record from client-provided Clerk data (fallback).
const upsertFromClerkSnapshot = async (clerkUserId, { fullName, imageUrl, email } = {}) => {
    let user = await User.findOne({
        $or: [{ clerkId: clerkUserId }, { _id: clerkUserId?.match(/^[0-9a-fA-F]{24}$/) ? clerkUserId : null }]
    }).select("-password");

    if (user) {
        let changed = false;
        if (!user.imageUrl && imageUrl) {
            user.imageUrl = imageUrl;
            changed = true;
        }
        if (!user.fullName && fullName) {
            user.fullName = fullName;
            changed = true;
        }
        if (email && (!user.email || user.email.endsWith("@unknown.local"))) {
            user.email = String(email).trim().toLowerCase();
            changed = true;
        }
        if (changed) {
            await user.save({ validateBeforeSave: false });
        }
        return user;
    }

    const setOnInsert = {
        fullName: fullName || "User",
        email: email ? String(email).trim().toLowerCase() : placeholderEmail(clerkUserId),
    };
    if (imageUrl) setOnInsert.imageUrl = imageUrl;

    const attempt = (onInsert) =>
        User.findOneAndUpdate(
            { clerkId: clerkUserId },
            { clerkId: clerkUserId, $setOnInsert: onInsert },
            { new: true, upsert: true, runValidators: true },
        ).select("-password");

    try {
        return await attempt(setOnInsert);
    } catch (upsertError) {
        if (upsertError?.code === 11000) {
            return attempt({ ...setOnInsert, email: placeholderEmail(clerkUserId) });
        }
        throw upsertError;
    }
};

const findCurrentUser = async (userId) => {
    if (!userId) return null;
    if (userId.match?.(/^[0-9a-fA-F]{24}$/)) {
        const found = await User.findById(userId).select("-password");
        if (found) return found;
    }
    return User.findOne({ clerkId: userId }).select("-password");
};

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = getUserId(req);
        const users = await User.find({
            _id: { $ne: currentUserId }
        }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.clearCookie("__session");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};

// POST /api/user/sync — create the local profile the first time, using the
// Clerk user data sent from the frontend (same pattern as /auth/callback)
export const syncMyProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, imageUrl, email } = req.body ?? {};
        const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
        const user = await upsertFromClerkSnapshot(getUserId(req), { fullName, imageUrl, email });
        if (!user) {
            return res.status(404).json({ message: "Profile not found. Please sign in again." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("error syncMyProfile", error.message);
        next(error)
    }
}

// GET /api/user/me — profile of the currently logged-in user
// Returns 204 when no local record exists yet (frontend then calls /sync)
export const getMyProfile = async (req, res, next) => {
    try {
        const user = await findCurrentUser(getUserId(req));
        if (!user) {
            return res.status(204).send();
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("error getMyProfile", error.message);
        next(error)
    }
}

// PATCH /api/user/me — update name and/or email
export const updateMyProfile = async (req, res, next) => {
    try {
        const user = await findCurrentUser(getUserId(req));
        if (!user) {
            return res.status(409).json({ message: "Profile not initialized yet — reload the page once to sync it" });
        }

        const { fullName, email } = req.body ?? {};

        if (fullName !== undefined) {
            const name = String(fullName).trim();
            if (name.length < 2) {
                return res.status(400).json({ message: "Name must be at least 2 characters long" });
            }
            if (name.length > 80) {
                return res.status(400).json({ message: "Name must be at most 80 characters long" });
            }
            user.fullName = name;
        }

        if (email !== undefined) {
            const newEmail = String(email).trim().toLowerCase();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                return res.status(400).json({ message: "Please enter a valid email address" });
            }
            if (newEmail !== user.email) {
                const exists = await User.exists({ email: newEmail, _id: { $ne: user._id } });
                if (exists) {
                    return res.status(409).json({ message: "This email is already in use" });
                }
                user.email = newEmail;
            }
        }

        await user.save({ validateBeforeSave: false });

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

// POST /api/user/avatar — upload/replace the avatar image (stored on Cloudinary)
export const uploadMyAvatar = async (req, res, next) => {
    try {
        if (!req.files?.avatar || Array.isArray(req.files.avatar)) {
            return res.status(400).json({ message: "Please select an image to upload" });
        }
        const file = req.files.avatar;

        if (!file.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Avatar must be an image file" });
        }
        if (file.size > 5 * 1024 * 1024) {
            return res.status(400).json({ message: "Image must be smaller than 5MB" });
        }

        const user = await findCurrentUser(getUserId(req));
        if (!user) {
            return res.status(409).json({ message: "Profile not initialized yet — reload the page once to sync it" });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "beat-music/avatars",
            resource_type: "image",
            transformation: [
                { width: 400, height: 400, crop: "fill", gravity: "face" },
                { quality: "auto", fetch_format: "auto" },
            ],
        });

        user.imageUrl = result.secure_url;
        await user.save({ validateBeforeSave: false });

        res.status(200).json(user);
    } catch (error) {
        console.log("error uploadMyAvatar", error.message);
        next(error)
    }
}