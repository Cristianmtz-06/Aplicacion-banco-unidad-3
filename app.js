const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const clientes = [];
app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "views",
            "home.html"
        )
    );

});

app.get("/cliente", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "views",
            "cliente.html"
        )
    );

});

// Página principal
app.get("/admin", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "views",
            "index.html"
        )
    );

});

// Obtener clientes
app.get("/api/clientes", (req, res) => {
    res.json(clientes);
});

// Registrar cliente
app.post("/api/clientes", (req, res) => {

    const {
    nombre,
    correo,
    telefono,
    cuenta,
    tipoCliente
} = req.body;

    const nuevoCliente = {
    id: clientes.length + 1,
    nombre,
    correo,
    telefono,
    cuenta,
    tipoCliente,
    fechaRegistro: new Date().toLocaleString()
};

    clientes.push(nuevoCliente);

    res.json({
        success: true,
        cliente: nuevoCliente
    });

});

app.listen(3000, () => {
    console.log("==================================");
    console.log("SecureBank iniciado");
    console.log("http://localhost:3000");
    console.log("==================================");
});