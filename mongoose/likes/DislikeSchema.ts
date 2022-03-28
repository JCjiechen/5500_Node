import mongoose, { Schema } from "mongoose";
import Dislike from "../../models/likes/Dislike";

const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
export default DislikeSchema;