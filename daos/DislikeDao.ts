/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() { }

    /**
     * Uses DislikeModel to retrieve all user that dislikes the tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

    /**
    * Uses DislikeModel to retrieve All Tuits Disliked by User
    * @param {string} uid User's primary key
    * @returns Promise To be notified when tuit is retrieved from the database
    */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ dislikedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
    * Uses DislikeModel for user to dislikes the tuit
    * @param {string} uid User's primary key
    * @param {string} tid Tuit's primary key
    * @returns Promise To be notified when user dislikes the tuit
    */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });

    /**
     * Uses DislikeModel to retrieve single user dislkie the tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({ tuit: tid, dislikedBy: uid });

    /**
    * Uses DislikeModel for user to undislikes the tuit
    * @param {string} uid User's primary key
    * @param {string} tid Tuit's primary key
    * @returns Promise To be notified when user undislikes the tuit
    */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

    /**
     * Uses DislikeModel to coun how many users dislike the tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when user is counted
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({ tuit: tid });
}