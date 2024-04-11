/**
 * Keep this file in sync with the code in the "Usage" section
 * in /docs/manual/other-topics/typescript.md
 *
 * Don't include this comment in the md file.
 */
import {
  DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes,
  CreationOptional, Association, NonAttribute,
} from 'sequelize';
import { Product } from './product';
import { ProductOffer } from './productoffer';

const sequelize = new Sequelize('postgres://link_user:password@db:5432/linkby');

export class User extends Model<InferAttributes<User, { omit: 'products' }>, InferCreationAttributes<User, { omit: 'products' }>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string; // for nullable fields

  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare products?: NonAttribute<Product[]>;

  declare static associations: {
    products: Association<User, Product>;
  };

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'Users',
    sequelize // passing the `sequelize` instance is required
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Product, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'products' // this determines the name in `associations`!
});
Product.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
ProductOffer.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

(async () => {
  await sequelize.sync();
})();
