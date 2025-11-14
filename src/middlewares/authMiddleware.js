import authService from "../services/authService.js";

export const requireAuth = (roles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No autorizado" });
  const token = authHeader.split(" ")[1];
  const payload = authService.verifyToken(token);
  if (!payload) return res.status(401).json({ message: "Token inválido" });
  if (roles.length && !roles.includes(payload.role)) return res.status(403).json({ message: "Rol no autorizado" });
  req.user = payload;
  next();
};
