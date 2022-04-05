/**
 * @file Implements mongoose schema for follows
 */
 import mongoose, {Schema} from "mongoose";
 import Follow from "../../models/follows/Follow";
 
 /**
  * @typedef Follow Represents follows
  * @property {ObjectId[]} userFollowed user followed
  * @property {ObjectId[]}  userFollowd user folloing
  */
 const FollowSchema = new mongoose.Schema<Follow>({
     userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
     userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"}
 }, {collection: "follows"});
 export default FollowSchema;