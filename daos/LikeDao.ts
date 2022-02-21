/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

 /**
  * @class LikeDao Implements Data Access Object managing data storage
  * of likes
  * @property {LikeDao} likeDao Private single instance of LikeDao
  */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
      * Creates singleton DAO instance
      * @returns LikeDao
      */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
      * Uses LikeModel to retrieve all users that liked the tuit
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when users are retrieved from the database
      */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
      * Uses LikeModel to retrieve all tuits that are liked by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuits are retrieved from the database
      */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
      * Inserts likes instance into the database
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when liked tuit is inserted into the database
      */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
      * Removes likes from the database.
      * @param {string} uid User's primary key
      * @param {string} tid TUit's primary key
      * @returns Promise To be notified when likes is removed from the database
      */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}