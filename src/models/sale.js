import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Sale extends Model {}
Sale.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
}, { sequelize, modelName: "sale" });

export default Sale;
