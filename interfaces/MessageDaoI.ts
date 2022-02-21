import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    sendMessageTo (uid: string, auid: string): Promise<Message[]>;
    findAllMessagesSent (uid: string): Promise<Message[]>;
    fingAllMessagesReceived (uid: string): Promise<Message[]>;
    deleteMessage (uid: string, mid: string): Promise<any>;
    findMessageByMid (mid: string): Promise<Message>;
    findMessageByUid (uid: string): Promise<Message>;
};