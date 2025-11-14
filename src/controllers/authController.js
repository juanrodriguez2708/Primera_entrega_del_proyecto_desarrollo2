import express from "express";
import authService from "../services/authService.js";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const u = await authService.register(req.body);
    res.status(201).json({ id: u.id, username: u.username, role: u.role });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

export default router;
