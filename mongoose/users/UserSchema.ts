/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents users
 * @property {string} username The user's username
 * @property {string} password The user's password
 * @property {string} firstName The user's firstName
 * @property {string} lastNames The user's lastName
 * @property {string} email The user's email
 * @property {string} profilePhoto The user's profile Photo
 * @property {string} headerImage The user's header Image
 * @property {string} biography The user's biography
 * @property {Date} dateOfBirth The user's date Of Birth
 * @property {string} accountType The user's header accountType
 * @property {string} maritalStatus The user's header maritalStatus
 * @property {Location} location user's location
 * @property {number} salary user's salary
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;