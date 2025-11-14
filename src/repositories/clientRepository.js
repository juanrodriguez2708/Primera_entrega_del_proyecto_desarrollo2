import { Client } from "../models/index.js";
export default {
  create: (data) => Client.create(data),
  update: (id, data) => Client.update(data, { where: { id } }),
  findAll: () => Client.findAll(),
  findById: (id) => Client.findByPk(id)
};
