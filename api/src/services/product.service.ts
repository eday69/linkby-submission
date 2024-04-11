import fs from 'fs';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductImage } from '../models/productImage';
import { ProductOffer } from '../models/productoffer';

export const getProducts = async (): Promise<Product[]> => {
  return Product.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: ProductImage,
        as: 'images',
        limit: 1
      }
    ]
  })
  .then(products => {
    products.forEach(product => {
      const images = product?.images;
      if (images) {
        images.map(image => {
          const imageData = image.imageData.toString('base64');
          image['imageData'] = imageData;
        });
      }
      return product;
    });
    return products;
  });
};

export const getProduct = async (id: string): Promise<Product|null> => {
  return Product.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: ProductImage,
        as: 'images'
      }
    ]
  })
  .then(product => {
    const images = product?.images;
    if (images) {
      images.map(image => {
        const imageData = image.imageData.toString('base64');
        image['imageData'] = imageData;
      });
    }
    return product
  })
};

interface IProductOffer {
  offer: number
  createdAt: Date
  user?: {
    id: number
    name: string
  }
}

export const getProductOffers = async (id: string): Promise<IProductOffer[]|null> => {
  return ProductOffer.findAll({
    attributes: ['offer', 'createdAt'],
    where: { productId: id },
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name']
      },
    ]
  })
};

export const insertProduct = async (
  userId: number,
  name: string,
  price: number,
  description: string,
  images: Express.Multer.File[]|undefined
): Promise<Product> => {
  const newProduct = await Product.create({
    userId,
    name,
    description,
    price,
    status: 'Available'
  });
  if (images && images.length) {
    const prodImages = images.map(image => {
      const data = fs.readFileSync(image.path)
      return {
        productId: newProduct.id,
        imageType: image.mimetype,
        imageName: image.originalname,
        imageData: data
      }
    });
    await ProductImage.bulkCreate(prodImages);
  }

  return newProduct;
};

export const updateProduct = async (id: string, status: string): Promise<Product|null> => {
  const product = await Product.findOne({
    where: { id },
  });
  console.log('Found product', product);
  if (product) {
    product.status = status;
    await product.save();
    await product.reload();
  }
  console.log('product updated', product);
  return product
};

export const insertOffer = async (
  id: string,
  userId: number,
  offer: number,
): Promise<ProductOffer> => {
  return ProductOffer.create({
    productId: Number(id),
    userId,
    offer,
  });
};
