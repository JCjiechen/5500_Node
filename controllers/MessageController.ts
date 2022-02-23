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
  *     <li>GET /api/users/:uid/messages/:mid to retrieve a message by message id
  *     </li>
  *     <li>GET /api/users/:uid/messages/date to retrieve messages by specific date
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
            app.put("/api/users/:uid/messages/:mid", MessageController.messageController.deleteAllMessagesSent);
            app.get("/api/users/:uid/messages/date", MessageController.messageController.deleteAllMessagesReceived);
        }
        return MessageController.messageController;
    }

    private constructor() {}
    
    createMessageByUser = (req: Request, res: Response) =>
        MessageController.messageDao.createMessageByUser(req.params.uid, req.params.auid, req.body)
            .then((message: Message) => res.json(message));

    findAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSent(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    fingAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.uid, (req.params.mid))
            .then((status) => res.send(status));

    deleteAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesSent(req.params.uid)
            .then(status => res.send(status));

    deleteAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesReceived(req.params.uid)
            .then(status => res.send(status));

}
