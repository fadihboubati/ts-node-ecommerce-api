import { Router } from "express";
import { errorHandler } from "../middlewares/error-handlers";
import { createProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";


const productRoutes : Router = Router();

productRoutes.post('/', authMiddleware, errorHandler(createProduct));



export default productRoutes;