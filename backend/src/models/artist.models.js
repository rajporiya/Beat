import mongoose from "mongoose";
const artistSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, index: true }, bio: { type: String, default: "" }, image: String, coverImage: String, followers: { type: Number, default: 0 }, genres: [{ type: String }], verified: { type: Boolean, default: false } }, { timestamps: true });
export const Artist = mongoose.model("Artist", artistSchema);
