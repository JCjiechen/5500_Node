/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents tuits
 * @property {string} tuit The tuits
 * @property {ObjectId[]} postedBy post user
 * @property {Date}  postedOn post date
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;