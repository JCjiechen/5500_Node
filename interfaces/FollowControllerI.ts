import {Request, Response} from "express";

/**
 * @file Declares follows controller interface.
 */
export default interface LikeControllerI {
    userFollow (req: Request, res: Response): void;
    userUnfollow (req: Request, res: Response): void;
    findAllFollowing (req: Request, res: Response): void;
    findAllFollower (req: Request, res: Response): void;
    userUnfollowAll (req: Request, res: Response): void;
    userDeleteAllFollower (req: Request, res: Response): void;
};