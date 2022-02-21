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
 