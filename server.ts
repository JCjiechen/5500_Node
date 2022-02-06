/**
 * @file Server file
 */
 import express, {Request, Response} from 'express';
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import mongoose from "mongoose";
 
 // connect to the database
 const url = "mongodb+srv://Jie:cj123456@cluster0.ozzi2.mongodb.net/tuiter?retryWrites=true&w=majority";
 mongoose.connect(url);
 
 // create RESTful Web service API
 const app = express();
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 

 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);

 
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);