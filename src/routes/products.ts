import { Router } from "express";
import { errorHandler } from "../middlewares/error-handlers";
import { createProduct, deleteProduct, getProductsByUser, listAllProducts, updateProduct } from "../controllers/products";
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

productRoutes.post('/', authenticate, authorize(['ADMIN'], ["READ"]), errorHandler(createProduct));
productRoutes.get('/list', ...authMiddlewares, errorHandler(listAllProducts));

productRoutes.get('user/:id', authenticate, authorize(['ADMIN'], ["READ"]), errorHandler(getProductsByUser));
productRoutes.put('/:id', authenticate, authorize(['ADMIN'], ["CREATE"]), errorHandler(updateProduct));
productRoutes.delete('/:id', authenticate, authorize(['ADMIN'], ["CREATE"]), errorHandler(deleteProduct));


export default productRoutes;