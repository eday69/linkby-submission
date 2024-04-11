import express from 'express';
import multer from 'multer';
import { healthCheck } from '../handler/healthcheck';
import { loginHandler } from '../handler/loginHandler';
import {
  newProductHandler,
  productHandler,
  productNewOfferHandler,
  productOffersHandler,
  productsHandler,
  productUpdateHandler
} from '../handler/productsHandler';

const upload = multer({ dest: 'uploads/' })
const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
router.post('/login', loginHandler);

// Products
router.get('/products', productsHandler);
router.post('/product', upload.array('files', 5), newProductHandler);
router.get('/product/:id', productHandler);
router.get('/product/:id/offers', productOffersHandler);
router.post('/product/:id/offer', productNewOfferHandler);
router.put('/product/:id', productUpdateHandler);

export default router;
