import express from 'express';
import multer from 'multer';
import { healthCheck } from '../handler/healthcheck';
import { loginHandler } from '../handler/loginHandler';
import { newProductsHandler, productHandler, productsHandler } from '../handler/productsHandler';

const upload = multer({ dest: 'uploads/' })
const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
router.post('/login', loginHandler);

// Products
router.get('/products', productsHandler); // get all products
router.post('/product', upload.array('images', 5), newProductsHandler); // get all products
router.get('/product/:productId', productHandler); // get product :id

export default router;
