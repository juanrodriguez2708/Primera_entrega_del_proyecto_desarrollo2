import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {}
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  passwordHash: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "seller" } // seller | admin
}, { sequelize, modelName: "user" });

export default User;
