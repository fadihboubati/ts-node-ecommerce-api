import { Router } from "express";
import { errorHandler } from "../middlewares/error-handlers";
import { createProduct, listAllProducts } from "../controllers/products";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorizes";


const productRoutes : Router = Router();

productRoutes.post('/', authenticate, authorize(['ADMIN'], ["CREATE"]), errorHandler(createProduct));
productRoutes.get('/list', authenticate, authorize(['ADMIN'], ["READ"]), errorHandler(listAllProducts));



export default productRoutes;