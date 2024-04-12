import {
  DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes,
  CreationOptional, ForeignKey, Association, NonAttribute,
} from 'sequelize';
import { User } from './user';
import { ProductImage } from './productImage';
import { ProductOffer } from './productoffer';

const sequelize = new Sequelize('postgres://link_user:password@db:5432/linkby');

export class Product extends Model<InferAttributes<Product,  {}>, InferCreationAttributes<Product,  {}>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare status: string; // for nullable fields

  // declare owner?: NonAttribute<User>;

  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare images?: NonAttribute<ProductImage[]>;

  declare static associations: {
    images: Association<Product, ProductImage>;
  };
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    price: {
      type: DataTypes.NUMBER
    },
    status: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'Products',
    sequelize // passing the `sequelize` instance is required
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Product.hasMany(ProductImage, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'images' // this determines the name in `associations`!
});
Product.hasMany(ProductOffer, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'offers' // this determines the name in `associations`!
});
ProductOffer.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' });

(async () => {
  await sequelize.sync();
})();
