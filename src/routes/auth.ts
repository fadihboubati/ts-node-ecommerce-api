import {Router} from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../middlewares/error-handlers';
import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validation';
import {logIn as loginAuth, signUp as signUpAuth} from '../validations/auth.validation';
import { queryBuilder } from '../middlewares/queryBuilder';


const authRoutes : Router = Router();

authRoutes.post('/login', queryBuilder, validate(loginAuth), errorHandler(login));
authRoutes.post('/signup', queryBuilder, validate(signUpAuth), errorHandler(signup));
authRoutes.get('/me', authenticate, errorHandler(me));


export default authRoutes;