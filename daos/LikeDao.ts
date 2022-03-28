/**
 * @file Implements DAO managing data storage of likes and dislikes. Uses mongoose LikeModel and DislikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";
import Dislike from "../models/likes/Dislike";
import DislikeModel from "../mongoose/likes/DislikeModel";


/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes and dislikes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() { }

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();

    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({ likedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({ tuit: tid, likedBy: uid });

    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({ tuit: tid });


    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

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

    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({ tuit: tid, dislikedBy: uid });

    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({ tuit: tid });
}