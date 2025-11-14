import express from "express";
import productService from "../services/productService.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const p = await productService.addProduct(req.body);
    res.status(201).json(p);
  } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
  try { res.json(await productService.getProducts()); } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const p = await productService.getProductById(req.params.id);
    if (!p) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(p);
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.json(updated);
  } catch (e) { next(e); }
});

export default router;
