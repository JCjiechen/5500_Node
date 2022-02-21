/**
 * @file Declares Follow data type.
 */
 import User from "../users/User";

 /**
  * @typedef Follow Represents follow data type.
  * @property {User} userFollowed user followed
  * @property {User} userFollowing user following
  */
export default interface Tuit {
    userFollowed: User,
    userFollowing: User
};