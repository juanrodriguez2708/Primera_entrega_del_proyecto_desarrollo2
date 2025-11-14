import { Sequelize } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("database.sqlite"),
  logging: false
});

export { sequelize };
