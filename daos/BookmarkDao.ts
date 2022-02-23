/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

 /**
  * @class BookmarkDao Implements Data Access Object managing data storage
  * of Bookmarks
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
      * Creates singleton DAO instance
      * @returns BookmarkDao
      */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
      * Inserts bookmarks instance into the database
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when bookmarked tuit is inserted into the database
      */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
      * Removes bookmarks from the database.
      * @param {string} uid User's primary key
      * @param {string} tid TUit's primary key
      * @returns Promise To be notified when bookmarks is removed from the database
      */
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    
    /**
      * Uses BookmarkModel to retrieve all tuits that are bookmarked by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuits are retrieved from the database
      */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
      * Uses BookmarkModel to retrieve all users that bookmarked the tuit
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when users are retrieved from the database
      */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec();

    /**
      * Uses BookmarkModel to retrieve a specific tuit that is bookmarked by the user
      * @param {string} tid Tuit's primary key
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuit is retrieved from the database
      */
    findSpecificTuitBookmarkedByUser = async (tid: string, uid: string): Promise<any> =>
        await BookmarkModel
            .find({bookmarkedBy: uid, bookmarkedTuit: tid})
            .populate("bookmarkedTuit")
            //.find({_id: tid})
            //.populate("bookmarkedBy")
            .exec();
}