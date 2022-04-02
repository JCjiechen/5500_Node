import { Request, Response } from "express";

/**
 * @file Declares dislikes controller interface.
 */
export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
    userAlreadyDislikedTuit(req: Request, res: Response): void;
};