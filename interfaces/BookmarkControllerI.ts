import {Request, Response} from "express";

/**
 * @file Declares bookmarks controller interface.
 */
export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    findSpecificTuitBookmarkedByUser (req: Request, res: Response): void;
};