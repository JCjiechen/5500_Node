/**
 * @file Controller RESTful Web service API for follows resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/follows/:auid to record that a user follows another user
  *     </li>
  *     <li>DELETE /api/users/:uid/unfollows/:auid to record that a user no longer follows another usre
  *     </li>
  *     <li>GET /api/users/:uid/follows to retrieve all the users the user is following
  *     </li>
  *     <li>GET /api/users/:uid/follower to retrieve all folowers of the user
  *     </li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
  * @property {FollowController} followController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;

     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return FollowController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
             app.post("/api/users/:uid/follows/:auid", FollowController.followController.userFollow);
             app.delete("/api/users/:uid/unfollows/:auid", FollowController.followController.userUnfollow);
             app.get("/api/users/:uid/follows", FollowController.followController.findAllFollowing);
             app.get("/api/users/:uid/follower", FollowController.followController.findAllFollower);
             app.delete("/api/users/:uid/unfollows", FollowController.followController.userUnfollowAll);
             app.delete("/api/users/:uid/deletefollower", FollowController.followController.userDeleteAllFollower);
         }
         return FollowController.followController;
     }
 
     private constructor() {}

     /**
      * user follows another user
      * @param {Request} req Represents request from client, including the
      * path parameters uid and auid representing the user that is following another user
      * and the user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follows that was inserted in the
      * database
      */
      userFollow = (req: Request, res: Response) =>
        FollowController.followDao.userFollow(req.params.uid, req.params.auid)
          .then(follows => res.json(follows));
 
     /**
      * user unfollows another user
      * @param {Request} req Represents request from client, including the
      * path parameters uid and auid representing the user that is unfollowing another user
      * and the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follows was successful or not
      */
      userUnfollow = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollow(req.params.uid, req.params.auid)
            .then(status => res.send(status));
    
     /**
      * Retrieves all users followed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user follows other users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were followed
      */
      findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));

     /**
      * Retrieves all users that follows a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the bookmarked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllFollower = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollower(req.params.uid)
            .then(follows => res.json(follows));

     /**
      * user unfollows all the users they are following
      * @param {Request} req Represents request from client, including the
      * path parameters uid representing the user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follows was successful or not
      */
     userUnfollowAll = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAll(req.params.uid)
            .then(status => res.send(status));

     /**
      * user deletes all the users that are following him
      * @param {Request} req Represents request from client, including the
      * path parameters uid representing the user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the followers was successful or not
      */
     userDeleteAllFollower = (req: Request, res: Response) =>
     FollowController.followDao.userDeleteAllFollower(req.params.uid)
         .then(status => res.send(status));
 };