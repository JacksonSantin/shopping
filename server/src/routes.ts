import express from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import EstablishmentController from './controllers/EstablishmentController';
import ProductsController from './controllers/ProductsController';
import ConnectionsController from './controllers/ConnectionsController';
import ProductRegisterController from './controllers/ProductRegisterController';
import BuyProductController from './controllers/BuyProductController';
import ProductFilterController from './controllers/ProductFilterController';
import ReportController from './controllers/ReportController';
const routes = express.Router();

const userController = new UserController();
const sessionController = new SessionController();
const establishmentController = new EstablishmentController();
const productsController = new ProductsController();
const connectionsController = new ConnectionsController();
const productRegister = new ProductRegisterController();
const buyProduct = new BuyProductController();
const productFilter = new ProductFilterController();
const report = new ReportController();

routes.post('/usuarios', userController.create);
routes.get('/usuarios/:id', userController.show);
routes.put('/usuarios/:id', userController.update);

routes.post('/sessao', sessionController.create);

routes.post('/estabelecimento', establishmentController.create);
routes.get('/estabelecimento/:id', establishmentController.show);
routes.put('/estabelecimento/:id', establishmentController.update);
routes.get('/todos-estabelecimentos/:id', establishmentController.index);
routes.delete('/estabelecimentos/:id', establishmentController.delete);

routes.post('/produtos', productsController.create);
routes.get('/produtos/:id', productsController.show);
routes.put('/produtos/:id', productsController.update);
routes.get('/todos-produtos/:id', productsController.index);
routes.delete('/produtos/:id', productsController.delete);

routes.get('/conexoes', connectionsController.index);

routes.get('/products-register/establishments/:id', productRegister.index);

routes.put('/comprar-produto/:id', buyProduct.update);

routes.get('/filter-product-by-establishment/:id', productFilter.show);

routes.get('/relatorios/:id', report.productQuantity);

export default routes;
