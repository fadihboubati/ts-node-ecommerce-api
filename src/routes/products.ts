import { Router } from "express";
import { errorHandler } from "../middlewares/error-handlers";
import { createProduct, listAllProducts } from "../controllers/products";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorizes";

import dotenv from "dotenv"
dotenv.config({path: ".env"});


const productRoutes : Router = Router();
const authMiddlewares = [authenticate];

if (!(process.env.NODE_ENV === 'production')) {
    console.log("In production mode");
    authMiddlewares.push(authorize(['ADMIN'], ["READ"]));
}

productRoutes.post('/', authenticate, authorize(['ADMIN'], ["CREATE"]), errorHandler(createProduct));
productRoutes.get('/list', ...authMiddlewares, errorHandler(listAllProducts));



export default productRoutes;