import Informe from "../models/Informe.js";

export default {
    async createInforme(req, res) {
        try {
            const informe = await Informe.create(req.body);
            res.json(informe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
