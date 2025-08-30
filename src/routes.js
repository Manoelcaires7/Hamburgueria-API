import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import productController from './app/controllers/productController';
import authMiddleware from './app/middlewares/auth';
import categoryController from './app/controllers/categoryController';
import OrderController from './app/controllers/OrderController';
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), productController.store);
routes.get('/products', productController.index);
routes.put('/products/:id', upload.single('file'), productController.update);


routes.post('/categories', upload.single('file'), categoryController.store);
routes.get('/categories', categoryController.index);
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;