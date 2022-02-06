import UserDao from "../daos/UserDao";
import User from "../models/users/User";
import {Express, Request, Response} from "express";
import UserControllerI from "../interfaces/UserControllerI";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            
            // for testing without postman. Not RESTful
            app.get("/api/users/create", UserController.userController.createUser);
            app.get("/api/users/:uid/delete", UserController.userController.deleteUser);
            app.get("/api/users/delete", UserController.userController.deleteAllUsers);
            
            // RESTful User Web service API
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
    }

    private constructor() {}

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));
};