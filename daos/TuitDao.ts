/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class TuitDao Implements Data Access Object managing data storage
  * of Tuits
  * @property {TuitDao} tuitDao Private single instance of TuitDao
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;

     /**
      * Creates singleton DAO instance
      * @returns TuitDao
      */
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }

     private constructor() {}

     /**
      * Uses TuitModel to retrieve all tuits documents from tuits collection
      * @returns Promise To be notified when the tuits are retrieved from
      * database
      */
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find();

    /**
      * Uses TuitModel to retrieve all tuits documents from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the tuits are retrieved from
      * database
      */
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid});

    /**
      * Uses TuitModel to retrieve single tuit document from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuit is retrieved from the database
      */
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();

    /**
      * Inserts tuit instance into the database with user id
      * @param {string} uid User's primary key
      * @param {Tuit} tuit Instance to be inserted into the database
      * @returns Promise To be notified when tuit is inserted into the database
      */
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});

    /**
      * Updates tuit with new values in database
      * @param {string} uid User's primary key
      * @param {Tuit} tuit Tuit object containing properties and their new values
      * @returns Promise To be notified when tuit is updated in the database
      */
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});

    /**
      * Removes tuit from the database.
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuit is removed from the database
      */
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }