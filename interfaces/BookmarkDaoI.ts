import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnBookmarksTuit (tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    findSpecificTuitBookmarkedByUser (tid: string, uid: string): Promise<Bookmark[]>;
};