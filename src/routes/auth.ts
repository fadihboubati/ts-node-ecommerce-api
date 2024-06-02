import {Router} from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../middlewares/error-handlers';
import { authenticate } from '../middlewares/authenticate';

const authRoutes : Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));
authRoutes.get('/me', authenticate, errorHandler(me));


export default authRoutes;