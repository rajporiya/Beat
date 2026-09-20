import mongoose from "mongoose";
const userSchema = new mongoose.Schema({ fullName: { type: String, required: true, trim: true }, imageUrl: String, clerkId: { type: String, unique: true, sparse: true }, email: { type: String, unique: true, sparse: true, lowercase: true, trim: true }, password: { type: String, select: false }, role: { type: String, enum: ["user", "admin"], default: "user" } }, { timestamps: true });
export const User = mongoose.model("User", userSchema);
