/**
 * @file Implements mongoose schema for messages
 */
 import mongoose, {Schema} from "mongoose";
 import Message from "../../models/messages/Message";
 
 /**
  * @typedef Message Represents messages
  * @property {string} message message content
  * @property {User} to User message sent to
  * @property {User} from User message sent from
  * @property {Date} sentOn message sent date
  */
 const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
 }, {collection: "messages"});
 export default MessageSchema;