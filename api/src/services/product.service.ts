import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductImage } from '../models/productImage';

export const getProducts = async (): Promise<Product[]> => {
  return Product.findAll({
    include: {
      model: User,
      attributes: ['id', 'name']
    },
  });
};

export const getProduct = async (productId: string): Promise<Product|null> => {
  return Product.findOne({ where: { id: productId } })
};

export const insertProduct = async (
  ownerId: number,
  name: string,
  price: number,
  description: string,
  images: Express.Multer.File[]|undefined
): Promise<Product> => {
  console.log('to insert', {
    ownerId,
    name,
    description,
    price,
    images,
    status: 'Available'
  });
  const newProduct = await Product.create({
    ownerId,
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
