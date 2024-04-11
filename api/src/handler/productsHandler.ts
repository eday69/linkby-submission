import { Request, Response } from 'express';
import { getProduct, getProductOffers, getProducts, insertProduct, updateProduct } from '../services/product.service';


export async function productsHandler(
  req: Request,
  res: Response
) {
  if (!req) return;
  const products = await getProducts();
  res.json({ products: products.map(p => p.dataValues) });
}

export async function productHandler(
  req: Request,
  res: Response
) {
  // console.log('incoming', req.body);
  const { id } = req.params
  const product = await getProduct(id);

  if (!product) {
    return res.status(404).json({
      type: 'error',
      message: "Product not found",
    });
  }

  res.json(product);
}

export async function productOffersHandler(
  req: Request,
  res: Response
) {
  // console.log('incoming', req.body);
  const { id } = req.params
  const product = await getProductOffers(id);

  if (!product) {
    return res.status(404).json({
      type: 'error',
      message: "Product not found",
    });
  }

  res.json(product);
}

export async function newProductsHandler(
  req: Request,
  res: Response
) {
  if (!req) return;
  const { name, price, description, userId } = req.body;
  const images = req.files as Express.Multer.File[];

  console.log('received ', req.body, images);
  const product = await insertProduct(userId, name, price, description, images);
  return res.status(201).json({ product })
  // res.json({ products: products.map(p => p.dataValues) });
}

export async function productUpdateHandler(
  req: Request,
  res: Response
) {
  // console.log('incoming', req.body);
  const { id } = req.params
  const { status } = req.body;
  const product = await updateProduct(id, status);

  if (!product) {
    return res.status(404).json({
      type: 'error',
      message: "Product not found",
    });
  }

  res.json(product);
}
