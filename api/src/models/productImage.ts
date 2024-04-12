import {
  DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes,
  CreationOptional, ForeignKey,
} from 'sequelize';
import { Product } from './product';

const sequelize = new Sequelize('postgres://link_user:password@db:5432/linkby');

export class ProductImage extends Model<InferAttributes<ProductImage, {}>, InferCreationAttributes<ProductImage, {}>> {
  declare id: CreationOptional<number>;
  declare productId: ForeignKey<Product['id']>;
  declare imageType: string;
  declare imageName: string;
  declare imageData: Buffer|string;

  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    productId: {
      type: DataTypes.INTEGER,
    },

    imageType: DataTypes.STRING(128),
    imageName: DataTypes.STRING(128),
    imageData: DataTypes.BLOB('long'),

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'ProductImage',
    sequelize // passing the `sequelize` instance is required
  }
);

(async () => {
  await sequelize.sync();
})();
