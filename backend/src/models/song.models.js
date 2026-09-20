import mongoose from "mongoose";
const songSchema = new mongoose.Schema({ title: { type: String, required: true, trim: true }, artist: { type: String, required: true, trim: true }, imageUrl: { type: String, required: true }, audioUrl: { type: String, required: true }, duration: { type: Number, required: true, min: 0 }, plays: { type: Number, default: 0 }, albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album" }, genre: { type: String, index: true }, isExplicit: { type: Boolean, default: false } }, { timestamps: true });
songSchema.index({ title: "text", artist: "text" });
export const Song = mongoose.model("Song", songSchema);
