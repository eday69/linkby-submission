import {
  DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes,
  CreationOptional, ForeignKey,
} from 'sequelize';
import { User } from './user';
import { Product } from './product';
const sequelize = new Sequelize('postgres://link_user:password@db:5432/linkby');

export class ProductOffer extends Model<InferAttributes<ProductOffer,  {}>, InferCreationAttributes<ProductOffer,  {}>> {
  declare id: CreationOptional<number>;
  declare productId: ForeignKey<Product['id']>;
  declare userId: ForeignKey<User['id']>;
  declare offer: number;

  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProductOffer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    offer: {
      type: DataTypes.DECIMAL
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'ProductOffer',
    sequelize // passing the `sequelize` instance is required
  }
);

(async () => {
  await sequelize.sync();
})();
