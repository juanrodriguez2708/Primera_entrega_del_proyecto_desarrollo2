const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());

const db = new sqlite3.Database("./productos.db", (err) => {
    if (err) console.error("Error SQLite:", err.message);
    else console.log("SQLite conectado (productos)");
});

db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        stock INTEGER NOT NULL,
        precio REAL NOT NULL
    )
`);

// Crear producto
app.post("/productos", (req, res) => {
    const { nombre, stock, precio } = req.body;

    db.run(
        "INSERT INTO productos (nombre, stock, precio) VALUES (?, ?, ?)",
        [nombre, stock, precio],
        function (err) {
            if (err) return res.status(500).json({ error: "Error al insertar" });
            res.json({ id: this.lastID, nombre, stock, precio });
        }
    );
});

// Obtener todos
app.get("/productos", (req, res) => {
    db.all("SELECT * FROM productos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error BD" });
        res.json(rows);
    });
});

// Obtener uno
app.get("/productos/:id", (req, res) => {
    db.get(
        "SELECT * FROM productos WHERE id=?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: "Error BD" });
            if (!row) return res.status(404).json({ error: "No encontrado" });
            res.json(row);
        }
    );
});

// Actualizar
app.put("/productos/:id", (req, res) => {
    const { nombre, stock, precio } = req.body;

    db.run(
        "UPDATE productos SET nombre=?, stock=?, precio=? WHERE id=?",
        [nombre, stock, precio, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: "Error actualizar" });
            res.json({ id: req.params.id, nombre, stock, precio });
        }
    );
});

// Eliminar
app.delete("/productos/:id", (req, res) => {
    db.run(
        "DELETE FROM productos WHERE id=?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: "Error eliminar" });
            res.json({ mensaje: "Producto eliminado" });
        }
    );
});

app.listen(3002, () => console.log("MS Productos en puerto 3002"));
