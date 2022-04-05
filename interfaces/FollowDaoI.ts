import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follow related data access object methods
 */
export default interface FollowDaoI {
    userFollow (uid: string, auid: string): Promise<Follow>;
    userUnfollow (uid: string, auid: string): Promise<any>;
    findAllFollowing (uid: string): Promise<Follow[]>;
    findAllFollower (uid: string): Promise<Follow[]>;
    userUnfollowAll (uid: string): Promise<any>;
    userDeleteAllFollower (uid: string): Promise<any>;
};