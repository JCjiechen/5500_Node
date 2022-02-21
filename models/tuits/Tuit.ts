/**
 * @file Declares Tuit data type.
 */
import User from "../users/User";

 /**
  * @typedef Tuit Represents tuit data type.
  * @property {string} tuit tuit
  * @property {User} postedBy User post the tuit
  * @property {Date} postedOn date post the tuit
  */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};