import express from "express";
import { sequelize } from "./config/database.js";
import { Client, Product, Sale, SaleItem, User } from "./models/index.js";


import clientController from "./controllers/clientController.js";
import productController from "./controllers/productController.js";
import saleController from "./controllers/saleController.js";
import authController from "./controllers/authController.js";
import informeRoutes from "./routes/informeRoutes.js";


import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

// Rutas públicas
app.use("/auth", authController);
app.use("/clients", clientController);
app.use("/products", productController);
app.use("/sales", saleController);
app.use("/api/informes", informeRoutes);


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({ alter: true });

  // Crear usuario admin por defecto si no existe
  const { default: userRepo } = await import("./repositories/userRepository.js");
  const existingAdmin = await userRepo.findByUsername("admin").catch(()=>null);
  if (!existingAdmin) {
    const bcrypt = (await import("bcrypt")).default;
    const hash = await bcrypt.hash("admin123", 10);
    await userRepo.create({ username: "admin", passwordHash: hash, role: "admin" });
    console.log("Usuario admin creado: admin / admin123");
  }

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})();
