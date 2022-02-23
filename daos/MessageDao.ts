/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
 import MessageModel from "../mongoose/messages/MessageModel";
 import Message from "../models/messages/Message";
 import MessageDaoI from "../interfaces/MessageDaoI";
 
 /**
  * @class MessageDao Implements Data Access Object managing data storage
  * of Messages
  * @property {MessageDao} messageDao Private single instance of MessageDao
  */
  export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
      * Inserts message instance into the database with user id, another user id and message
      * @param {string} uid primary key of the user who send the message
      * @param {string} auid primary key of another user who receive the message
      * @param {Message} message Instance to be inserted into the database
      * @returns Promise To be notified when message is inserted into the database
      */
    createMessageByUser = async (uid: string, auid: string, message : Message): Promise<Message> =>
        MessageModel.create({...message, from : uid, to : auid});

    /**
      * Uses MessageModel to retrieve all messages sent by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the messages are retrieved from
      * database
      */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from : uid});

    /**
      * Uses MessageModel to retrieve all messages received by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the messages are retrieved from
      * database
      */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to : uid});

    /**
      * Removes message from the database.
      * @param {string} uid User's primary key
      * @param {string} tid Message's primary key
      * @returns Promise To be notified when message is removed from the database
      */
    deleteMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({_id : mid});

    deleteAllMessagesSent = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({from: uid});

    deleteAllMessagesReceived = async  (uid: string): Promise<any> =>
        MessageModel.deleteMany({to: uid});

}