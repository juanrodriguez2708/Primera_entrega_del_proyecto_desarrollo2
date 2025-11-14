import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Client extends Model {}
Client.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT }
}, { sequelize, modelName: "client" });

export default Client;
