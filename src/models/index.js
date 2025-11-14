import { sequelize } from "../config/database.js";
import Client from "./client.js";
import Product from "./product.js";
import Sale from "./sale.js";
import SaleItem from "./saleItem.js";
import User from "./user.js";

// Relaciones
Client.hasMany(Sale, { foreignKey: "clientId" });
Sale.belongsTo(Client, { foreignKey: "clientId" });

Sale.hasMany(SaleItem, { foreignKey: "saleId" });
SaleItem.belongsTo(Sale, { foreignKey: "saleId" });

Product.hasMany(SaleItem, { foreignKey: "productId" });
SaleItem.belongsTo(Product, { foreignKey: "productId" });

export { sequelize, Client, Product, Sale, SaleItem, User };
