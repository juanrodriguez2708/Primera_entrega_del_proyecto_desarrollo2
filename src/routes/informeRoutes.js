import express from "express";
import informeController from "../controllers/informeController.js";

const router = express.Router();

router.post("/", informeController.createInforme);

export default router;
