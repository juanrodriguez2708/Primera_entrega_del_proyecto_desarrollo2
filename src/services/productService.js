import productRepo from "../repositories/productRepository.js";

export default {
  addProduct: async (data) => productRepo.create(data),
  updateProduct: async (id, data) => {
    await productRepo.update(id, data);
    return productRepo.findById(id);
  },
  getProducts: () => productRepo.findAll(),
  getProductById: (id) => productRepo.findById(id),
  findByCode: (code) => productRepo.findByCode(code)
};
