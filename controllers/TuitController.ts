import TuitDao from "../daos/TuitDao";
import Tuit from "../models/tuits/Tuit";
import {Express, Request, Response} from "express";
import TuitControllerI from "../interfaces/TuitControllerI";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/users/:uid/tuits", TuitController.tuitController.findAllTuitsByUser);
            app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {}
    
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    findAllTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuitByUser(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
};