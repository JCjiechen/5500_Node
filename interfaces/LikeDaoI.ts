import Like from "../models/likes/Like";
import Dislike from "../models/likes/Dislike";

/**
 * @file Declares API for Likes and Dislikes related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
    userLikesTuit(tid: string, uid: string): Promise<Like>;

    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    userUndislikesTuit(tid: string, uid: string): Promise<any>;
    userDislikesTuit(tid: string, uid: string): Promise<Dislike>;
};