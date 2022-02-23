/**
 * @file Controller RESTful Web service API for messages resource
 */
 import MessageDao from "../daos/MessageDao";
 import Message from "../models/messages/Message";
 import {Express, Request, Response} from "express";
 import MessageControllerI from "../interfaces/MessageControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/messages/:auid to create a new message instance for a given user
  *     </li>
  *     <li>GET /api/users/:uid/messagesSent to retrieve all the messages instances sent by the user
  *     </li>
  *     <li>GET /api/users/:uid/messagesReceived to retrieve all the messages instances received by the user
  *     </li>
  *     <li>DELETE /api/users/:uid/messages/:mid to remove a particular message instance 
  *     </li>
  *     <li>DELETE /api/users/:uid/messagesSent to deletes all messages user sent
  *     </li>
  *     <li>DELETE /api/users/:uid/messagesReceived to deletes all messages they received
  *     </li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
  export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
 
    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return MessageController
      */
     public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid/messages/:auid", MessageController.messageController.createMessageByUser);
            app.get("/api/users/:uid/messagesSent", MessageController.messageController.findAllMessagesSent);
            app.get("/api/users/:uid/messagesReceived", MessageController.messageController.fingAllMessagesReceived);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.deleteMessage);
            app.delete("/api/users/:uid/messagesSent", MessageController.messageController.deleteAllMessagesSent);
            app.delete("/api/users/:uid/messagesReceived", MessageController.messageController.deleteAllMessagesReceived);
        }
        return MessageController.messageController;
    }

    private constructor() {}
    
     /** user sends a message to another user
      * @param {Request} req Represents request from client, including body
      * containing the JSON object for the new message to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new message that was inserted in the
      * database
      */
    createMessageByUser = (req: Request, res: Response) =>
        MessageController.messageDao.createMessageByUser(req.params.uid, req.params.auid, req.body)
            .then((message: Message) => res.json(message));

     /** Retrieves all messages user sent from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user 
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */   
    findAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSent(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

     /**
      * Retrieves all messages user received from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user 
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */
    fingAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

     /**
      * deletes a message
      * @param {Request} req Represents request from client, including the
      * path parameters uid representing the user and mid representing the message
      * @param {Response} res Represents response to client, including status
      * on whether deleting the messages was successful or not
      */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.uid, req.params.mid)
            .then((status) => res.send(status));

     /**
      * user deletes all message they sent
      * @param {Request} req Represents request from client, including the
      * path parameters uid representing the user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the messages was successful or not
      */
    deleteAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesSent(req.params.uid)
            .then(status => res.send(status));

     /**
      * user deletes all message they received
      * @param {Request} req Represents request from client, including the
      * path parameters uid representing the user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the messages was successful or not
      */
    deleteAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesReceived(req.params.uid)
            .then(status => res.send(status));

}
