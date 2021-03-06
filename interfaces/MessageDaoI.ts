import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    createMessageByUser (uid: string, auid: string, message: Message): Promise<Message>;
    findAllMessagesSent (uid: string): Promise<Message[]>;
    findAllMessagesReceived (uid: string): Promise<Message[]>;
    deleteMessage (uid: string, mid: string): Promise<any>;
    deleteAllMessagesSent (uid: string): Promise<any>;
    deleteAllMessagesReceived (uid: string): Promise<any>;
};