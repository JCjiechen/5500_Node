/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
 import FollowModel from "../mongoose/follows/FollowModel";
 import Follow from "../models/follows/Follow";
 import FollowDaoI from "../interfaces/FollowDaoI";
 
 /**
  * @class FollowDao Implements Data Access Object managing data storage
  * of Follows
  * @property {FollowDao} followDao Private single instance of FollowDao
  */
 export default class FollowDao implements FollowDaoI {
     private static followDao: FollowDao | null = null;
 
     /**
      * Creates singleton DAO instance
      * @returns FollowDao
      */
     public static getInstance = (): FollowDao => {
         if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
         }
         return FollowDao.followDao;
     }
     
     private constructor() {}
     
     /**
      * Inserts follows instance into the database
      * @param {string} uid primary key of a user who is following another user
      * @param {string} auid primary key of another user who is being followed by the user
      * @returns Promise To be notified when follows is inserted into the database
      */
     userFollow = async (uid: string, auid: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: auid});

     /**
      * Inserts follows instance into the database
      * @param {string} uid primary key of a user who is unfollowing another user
      * @param {string} auid primary key of another user who is being unfollowed by the user
      * @returns Promise To be notified when follows is removed from the database
      */
     userUnfollow = async (uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: auid});
     
     /**
      * Uses FollowModel to retrieve all users that the user is following
      * @param {string} uid User's primary key
      * @returns Promise To be notified when users are retrieved from the database
      */
     findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

     /**
      * Uses FollowModel to retrieve all users that are following the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when users are retrieved from the database
      */
     findAllFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

     /**
      * Removes all user's following from the database.
      * @param {string} uid User's primary key
      * @returns Promise To be notified when all following is removed from the database
      */
     userUnfollowAll = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: uid});
      
     /**
      * Removes all user's folloer from the database.
      * @param {string} uid User's primary key
      * @returns Promise To be notified when all followers are removed from the database
      */
     userDeleteAllFollower  = async (uid : string): Promise<any> =>
        FollowModel.deleteMany({userFollowed: uid});
 }