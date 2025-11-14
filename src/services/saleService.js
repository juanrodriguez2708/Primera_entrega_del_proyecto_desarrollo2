import productRepo from "../repositories/productRepository.js";
import saleRepo from "../repositories/saleRepository.js";

export default {
  registerSale: async ({ clientId, items }) => {
    // items = [{ productId, quantity }]
    // validar stock y calcular total
    let total = 0;
    const updates = [];
    for (const it of items) {
      const product = await productRepo.findById(it.productId);
      if (!product) throw new Error(`Producto ${it.productId} no existe`);
      if (product.stock < it.quantity) throw new Error(`Stock insuficiente para producto ${product.id}`);
      const linePrice = product.price * it.quantity;
      total += linePrice;
      updates.push({ product, newStock: product.stock - it.quantity });
      it.price = product.price;
    }
    // crear venta
    const { sale, saleItems } = await saleRepo.createSale({ clientId, total }, items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })));
    // actualizar stock
    for (const u of updates) {
      await productRepo.update(u.product.id, { stock: u.newStock });
    }
    return { sale, saleItems };
  },
  getSales: () => saleRepo.findAll(),
  getSaleById: (id) => saleRepo.findById(id)
};
