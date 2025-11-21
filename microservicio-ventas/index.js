const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");

const app = express();
app.use(express.json());

// Conexión a SQLite
const db = new sqlite3.Database("./ventas.db", (err) => {
    if (err) console.error("Error al abrir ventas.db:", err.message);
    else console.log("SQLite conectado (ventas)");
});

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS ventas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clienteId INTEGER,
        productoId INTEGER,
        cantidad INTEGER,
        fecha TEXT
    )
`);
app.post("/ventas", async (req, res) => {
    const { clienteId, productoId, cantidad } = req.body;

    if (!clienteId || !productoId || !cantidad) {
        return res.status(400).json({ error: "clienteId, productoId y cantidad son obligatorios" });
    }

    try {
        // Verificar cliente mediante HTTP
        await axios.get(`http://localhost:3001/clientes/${clienteId}`);

        // Verificar producto mediante HTTP
        await axios.get(`http://localhost:3002/productos/${productoId}`);

        const fecha = new Date().toISOString();

        db.run(
            "INSERT INTO ventas (clienteId, productoId, cantidad, fecha) VALUES (?, ?, ?, ?)",
            [clienteId, productoId, cantidad, fecha],
            function (err) {
                if (err) {
                    console.error("ERROR SQLITE:", err.message);
                    return res.status(500).json({ error: "Error SQL", detalle: err.message });
                }

                res.json({
                    id: this.lastID,
                    mensaje: "Venta registrada",
                    fecha: fecha
                });
            }
        );

    } catch (error) {
        return res.status(400).json({
            error: "Error consultando microservicios de clientes o productos",
            detalle: error.response?.data || error.message
        });
    }
});
app.get("/ventas", (req, res) => {
    db.all("SELECT * FROM ventas", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error consultando ventas" });
        res.json(rows);
    });
});
app.get("/ventas/:id", async (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM ventas WHERE id = ?", [id], async (err, venta) => {
        if (err) return res.status(500).json({ error: "Error en la BD" });
        if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

        try {
            const cliente = await axios.get(`http://localhost:3001/clientes/${venta.clienteId}`);
            const producto = await axios.get(`http://localhost:3002/productos/${venta.productoId}`);

            res.json({
                venta,
                cliente: cliente.data,
                producto: producto.data
            });

        } catch (error) {
            res.status(400).json({
                error: "Error obteniendo información externa",
                detalle: error.response?.data || error.message
            });
        }
    });
});
app.listen(3003, () => {
    console.log("Microservicio Ventas corriendo en puerto 3003");
});
