import {Request, Response} from "express";
import Message from "../models/messages/Message";

/**
 * @file Declares message controller interface.
 */
export default interface MessageControllerI {
    createMessageByUser (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    fingAllMessagesReceived (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    deleteAllMessagesSent (req: Request, res: Response): void;
    deleteAllMessagesReceived (req: Request, res: Response): void;
};