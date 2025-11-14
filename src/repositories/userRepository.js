import { User } from "../models/index.js";
export default {
  create: (data) => User.create(data),
  findByUsername: (username) => User.findOne({ where: { username } })
};
