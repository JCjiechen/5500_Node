/**
 * @file Declares User data type.
 * It contains the basic infomation of a user.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents User data type.
 * @property {mongoose.Schema.Types.ObjectId} _id user's id
 * @property {string} username user's name
 * @property {string} password user's password
 * @property {string} firstName user's firstName
 * @property {string} lastName user's lastName
 * @property {string} email user's email
 * @property {string} profilePhoto user's profilePhoto
 * @property {string} headerImage user's headerImage
 * @property {string} biography user's biography
 * @property {Date} dateOfBirth user's dateOfBirth
 * @property {AccountType} accountType user's accountType
 * @property {MaritalStatus} maritalStatus user's maritalStatus
 * @property {Location} location user's location
 * @property {number} salary user's salary
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};