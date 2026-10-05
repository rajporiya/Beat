import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Song } from "../models/song.models.js";
import { User } from "../models/user.models.js";

const JWT_SECRET = process.env.JWT_SECRET || "beat_music_super_secure_jwt_secret_key_2026_spotify_clone";

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, sub: userId, role }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

const safeUser = (user) => {
    const adminEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
    const email = user.email?.trim().toLowerCase();
    const isAdmin = user.role === "admin" || (email && adminEmails.includes(email));

    return {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.imageUrl || "",
        role: isAdmin ? "admin" : (user.role || "user"),
        isAdmin: Boolean(isAdmin),
        createdAt: user.createdAt,
    };
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const trimmedName = String(name).trim();
        const trimmedEmail = String(email).trim().toLowerCase();

        if (trimmedName.length < 2) {
            return res.status(400).json({ message: "Name must be at least 2 characters" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        if (confirmPassword && password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email: trimmedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const adminEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
            .split(",")
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean);
        const role = adminEmails.includes(trimmedEmail) ? "admin" : "user";

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName: trimmedName,
            email: trimmedEmail,
            password: hashedPassword,
            role,
        });

        const token = generateToken(user._id, role);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: safeUser(user),
            token,
        });
    } catch (error) {
        console.error("Error in register:", error);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const trimmedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: trimmedEmail }).select("+password");

        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const adminEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
            .split(",")
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean);
        if (adminEmails.includes(trimmedEmail) && user.role !== "admin") {
            user.role = "admin";
            await user.save();
        }

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: safeUser(user),
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json({ success: true, user: safeUser(req.user) });
    } catch (error) {
        next(error);
    }
};

export const authCallback = async (req, res, next)=>{
    try {
        const { id, firstName, lastName, imageUrl, email } = req.body;
        const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "User";

        const existing = await User.findOne({ clerkId: id });
        if (!existing) {
            await User.create({
                clerkId: id,
                fullName,
                imageUrl,
                email: email ? String(email).trim().toLowerCase() : `clerk_${id}@unknown.local`,
            });
        } else {
            const update = {};
            if (!existing.imageUrl && imageUrl) update.imageUrl = imageUrl;
            if (!existing.fullName && fullName) update.fullName = fullName;
            if (email && (!existing.email || existing.email.endsWith("@unknown.local"))) {
                update.email = String(email).trim().toLowerCase();
            }
            if (Object.keys(update).length > 0) {
                await User.updateOne({ clerkId: id }, { $set: update });
            }
        }

        res.status(200).json ({
            success : true
        })
    } catch (error) {
        console.log("Error in auth ", error);
        next(error)
    }
}

export const getFearuresSogs = async (req, res, next)=>{
    try {
        // 6 song fetch 
        const songs = await Song.aggregate([
            {
                $sample : { size : 6}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        next(error)
    }
}
export const getMadeForYou = async (req, res, next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        next(error)
    }
}
export const getTrending = async (req, res, next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project: {
                    _id : 1,
                    title: 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])
        res.json(songs)

    } catch (error) {
        next(error)
    }
}
