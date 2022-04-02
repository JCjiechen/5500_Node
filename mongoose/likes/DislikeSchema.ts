/**
 * @file Implements mongoose schema for dislikes
 */
import mongoose, { Schema } from "mongoose";
import Dislike from "../../models/likes/Dislike";

/**
 * @typedef Dislike Represents dislikes
 * @property {ObjectId[]} tuit The tuits
 * @property {ObjectId[]} dislikeedBy dislikes user
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "dislikes" });
export default DislikeSchema;