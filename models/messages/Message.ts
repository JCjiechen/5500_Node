/**
 * @file Declares Message data type representing relationship between
 * users and users, as in user messages to other users
 */
 import User from "../users/User";
 
 /**
  * @typedef Like Represents likes relationship between a user and a tuit,
  * as in a user likes a tuit
  * @property {string} message message content
  * @property {User} to User message sent to
  * @property {User} from User message sent from
  * @property {Date} sentOn message sent date
  */
 export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
 };