import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class SaleItem extends Model {}
SaleItem.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
}, { sequelize, modelName: "saleItem" });

export default SaleItem;
