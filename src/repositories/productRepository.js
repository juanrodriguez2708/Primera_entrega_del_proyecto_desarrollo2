import { Product } from "../models/index.js";
export default {
  create: (data) => Product.create(data),
  update: (id, data) => Product.update(data, { where: { id } }),
  findAll: () => Product.findAll(),
  findById: (id) => Product.findByPk(id),
  findByCode: (code) => Product.findOne({ where: { code } })
};
