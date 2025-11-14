import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export default {
  register: async ({ username, password, role }) => {
    const hash = await bcrypt.hash(password, 10);
    return userRepo.create({ username, passwordHash: hash, role });
  },
  login: async ({ username, password }) => {
    const user = await userRepo.findByUsername(username);
    if (!user) throw new Error("Credenciales inválidas");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Credenciales inválidas");
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
};
