import { Request, Response } from "express";

/**
 * @file Declares likes controller interface.
 */
export default interface LikeControllerI {
    findAllUsersThatLikedTuit(req: Request, res: Response): void;
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    userTogglesTuitLikes(req: Request, res: Response): void;
    userAlreadyLikedTuit(req: Request, res: Response): void;
};