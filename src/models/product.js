import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Product extends Model {}
Product.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  category: { type: DataTypes.STRING }
}, { sequelize, modelName: "product" });

export default Product;
