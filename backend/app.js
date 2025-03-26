const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    database: "finca_cafetera",
    user: "root",
   
});

// Conexión a la base de datos
conexion.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        return;
    }
    console.log("Conexión a la base de datos establecida.");
});

// Configuración de middlewares
app.use(cors({
    origin: "*", // Permitir solicitudes desde cualquier origen (ajusta según sea necesario)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de helmet para la política de referencia
app.use(
    helmet({
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
);

// Configuración del motor de vistas
app.set("view engine", "ejs");

// Servir archivos estáticos desde la carpeta "frontend/public"
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Rutas para el inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/inicio.html"));
});

// Ruta para obtener todos los datos financieros
app.get("/datos", (req, res) => {
    const query = "SELECT * FROM datos_financieros";
    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err.message);
            return res.status(500).json({ error: "Error al obtener los datos" });
        }
        res.status(200).json(results);
    });
});

// Ruta para obtener datos financieros por mes
app.get("/datos/:mes", (req, res) => {
    const mes = req.params.mes;
    const query = "SELECT * FROM datos_financieros WHERE mes = ?";
    conexion.query(query, [mes], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err.message);
            return res.status(500).json({ error: "Error al obtener los datos" });
        }
        res.status(200).json(results);
    });
});

// Ruta para obtener todos los lotes
app.get("/lotesa", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const query = "SELECT * FROM lotes";
    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err.message);
            return res.status(500).json({ error: "Error al obtener los lotes" });
        }
        res.status(200).json(results);
    });
});

// Ruta para agregar un nuevo lote
app.post("/lotes", (req, res) => {
    const { nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra } = req.body;
    const query = `
        INSERT INTO lotes (nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    conexion.query(query, [nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra], (err) => {
        if (err) {
            console.error("Error al insertar el lote:", err.message);
            return res.status(500).json({ error: "Error al insertar el lote" });
        }
        res.status(201).json({ message: "Lote agregado correctamente" });
    });
});

// Ruta para actualizar un lote
app.put("/actualizar-lote/:id", (req, res) => {
    const id = req.params.id;
    const { nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra } = req.body;

    const campos = [];
    if (nombre_lote) campos.push(`nombre_lote = '${nombre_lote}'`);
    if (area_lote) campos.push(`area_lote = ${area_lote}`);
    if (tipo_cultivo) campos.push(`tipo_cultivo = '${tipo_cultivo}'`);
    if (variedad) campos.push(`variedad = '${variedad}'`);
    if (densidad_siembra) campos.push(`densidad_siembra = ${densidad_siembra}`);
    if (fecha_siembra) campos.push(`fecha_siembra = '${fecha_siembra}'`);

    if (campos.length === 0) {
        return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    const query = `UPDATE lotes SET ${campos.join(", ")} WHERE id = ?`;
    conexion.query(query, [id], (err) => {
        if (err) {
            console.error("Error al actualizar el lote:", err.message);
            return res.status(500).json({ error: "Error al actualizar el lote" });
        }
        res.status(200).json({ message: "Lote actualizado correctamente" });
    });
});

// Ruta para eliminar un lote
app.delete("/fechasLotes/:id", (req, res) => {
    // Permitir solicitudes desde orígenes desconocidos
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    const query = "DELETE FROM lotes WHERE id = ?";
    conexion.query(query, [id], (err) => {
        if (err) {
            console.error("Error al eliminar el lote:", err.message);
            return res.status(500).json({ error: "Error al eliminar el lote" });
        }
        res.status(200).json({ message: "Lote eliminado correctamente" });
    });
});

// Iniciar el servidor
app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000");
});


