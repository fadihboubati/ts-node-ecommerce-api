import {Router} from 'express';
import { login, signup } from '../controllers/auth';
import { errorHandler } from '../middlewares/error-handlers';

const authRoutes : Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));


export default authRoutes;