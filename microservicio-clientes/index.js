const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());

// Conexión a SQLite
const db = new sqlite3.Database("./clientes.db", (err) => {
    if (err) {
        console.error("Error al conectar SQLite:", err.message);
    } else {
        console.log("SQLite conectado (clientes)");
    }
});

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL
    )
`);

// Crear cliente
app.post("/clientes", (req, res) => {
    const { nombre, email } = req.body;

    db.run(
        "INSERT INTO clientes (nombre, email) VALUES (?, ?)",
        [nombre, email],
        function (err) {
            if (err) return res.status(500).json({ error: "Error al insertar" });
            res.json({ id: this.lastID, nombre, email });
        }
    );
});

// Obtener todos
app.get("/clientes", (req, res) => {
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error BD" });
        res.json(rows);
    });
});

// Obtener uno
app.get("/clientes/:id", (req, res) => {
    db.get(
        "SELECT * FROM clientes WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: "Error BD" });
            if (!row) return res.status(404).json({ error: "No encontrado" });
            res.json(row);
        }
    );
});

// Actualizar
app.put("/clientes/:id", (req, res) => {
    const { nombre, email } = req.body;

    db.run(
        "UPDATE clientes SET nombre=?, email=? WHERE id=?",
        [nombre, email, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: "Error al actualizar" });
            res.json({ id: req.params.id, nombre, email });
        }
    );
});

// Eliminar
app.delete("/clientes/:id", (req, res) => {
    db.run(
        "DELETE FROM clientes WHERE id=?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: "Error al eliminar" });
            res.json({ mensaje: "Cliente eliminado" });
        }
    );
});

app.listen(3001, () => console.log("MS Clientes en puerto 3001"));
