import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, description: { type: String, default: "" }, coverImage: String, owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], isPublic: { type: Boolean, default: true } }, { timestamps: true });
export const Playlist = mongoose.model("Playlist", playlistSchema);
