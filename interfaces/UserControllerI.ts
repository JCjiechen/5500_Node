import {Request, Response} from "express";
import User from "../models/users/User";

/**
 * @file Declares user controller interface.
 */
export default interface UserControllerI {
    findAllUsers (req: Request, res: Response): void;
    findUserById (req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
    updateUser (req: Request, res: Response): void;
    deleteUser (req: Request, res: Response): void;
    deleteAllUsers (req: Request, res: Response): void;
};