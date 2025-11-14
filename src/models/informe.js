import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Informe = sequelize.define("Informe", {
    estudiante: DataTypes.STRING,
    fecha_entrega: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING
});

export default Informe;
