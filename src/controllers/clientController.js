import express from "express";
import clientService from "../services/clientService.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try { res.json(await clientService.getClients()); } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const c = await clientService.getClientById(req.params.id);
    if (!c) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(c);
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await clientService.updateClient(req.params.id, req.body);
    res.json(updated);
  } catch (e) { next(e); }
});

export default router;
