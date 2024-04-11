import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductImage } from '../models/productImage';
import { ProductOffer } from '../models/productoffer';

export const getProducts = async (): Promise<Product[]> => {
  return Product.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'name']
    },
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
    ]
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
  console.log('to insert', {
    userId,
    name,
    description,
    price,
    images,
    status: 'Available'
  });
  const newProduct = await Product.create({
    userId,
    name,
    description,
    price,
    status: 'Available'
  });
  if (images && images.length) {
    const prodImages = images.map(image => {
      return {
        // productId: newProduct.id,
        imageType: image.mimetype,
        imageName: image.originalname,
        imageData: image.buffer
      }
    });
    await ProductImage.bulkCreate(prodImages);
  }

  return newProduct;
};

export const updateProduct = async (id: string, status: string): Promise<Product|null> => {
  const product = await getProduct(id);
  if (product) {
    product.status = status;
    await product?.save({fields: ['status']});
    await product?.reload();
  }
  return product
};
