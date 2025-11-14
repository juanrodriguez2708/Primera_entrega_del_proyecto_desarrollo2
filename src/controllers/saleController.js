import express from "express";
import saleService from "../services/saleService.js";
import pdfGen from "../utils/pdfGenerator.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    // body: { clientId, items: [{ productId, quantity }, ...] }
    const result = await saleService.registerSale(req.body);
    res.status(201).json(result);
  } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
  try { res.json(await saleService.getSales()); } catch (e) { next(e); }
});

router.get("/:id/pdf", async (req, res, next) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
    const stream = pdfGen.generateSalePDF(sale);
    res.setHeader("Content-Type", "application/pdf");
    stream.pipe(res);
  } catch (e) { next(e); }
});

export default router;
