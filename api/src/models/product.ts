/**
 * Keep this file in sync with the code in the "Usage" section
 * in /docs/manual/other-topics/typescript.md
 *
 * Don't include this comment in the md file.
 */
import {
  DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes,
  CreationOptional, NonAttribute, ForeignKey, Association,
} from 'sequelize';
import { User } from './user';
import { ProductImage } from './productImage';

const sequelize = new Sequelize('postgres://link_user:password@db:5432/linkby');

export class Product extends Model<InferAttributes<Product,  { omit: 'images' }>, InferCreationAttributes<Product,  { omit: 'images' }>> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User['id']>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare status: string; // for nullable fields

  declare owner?: NonAttribute<User>;

  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare images?: NonAttribute<ProductImage[]>;

  declare static associations: {
    owner: Association<User, Product>;
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
    ownerId: {
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
// ProductImage.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' })

// Product.belongsTo(User, { foreignKey: 'ownerId' });

(async () => {
  await sequelize.sync();
})();