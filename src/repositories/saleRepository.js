import { Sale, SaleItem, Product } from "../models/index.js";
export default {
  createSale: async (saleData, items) => {
    const sale = await Sale.create({ total: saleData.total, date: saleData.date, clientId: saleData.clientId });
    const saleItems = await Promise.all(items.map(it => SaleItem.create({
      saleId: sale.id,
      productId: it.productId,
      quantity: it.quantity,
      price: it.price
    })));
    return { sale, saleItems };
  },
  findAll: () => Sale.findAll({ include: [{ model: SaleItem, include: [Product] }] }),
  findById: (id) => Sale.findByPk(id, { include: [{ model: SaleItem, include: [Product] }] })
};
