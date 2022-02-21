import {Request, Response} from "express";
import Message from "../models/messages/Message";

/**
 * @file Declares message controller interface.
 */
export default interface MessageControllerI {
    sendMessageTo (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    fingAllMessagesReceived (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    findMessageByMid (req: Request, res: Response): void;
    findMessageByUid (req: Request, res: Response): void;
};