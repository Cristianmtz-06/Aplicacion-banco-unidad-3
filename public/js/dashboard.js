const formulario = document.getElementById("clienteForm");
const tablaClientes = document.getElementById("tablaClientes");

const totalClientes = document.getElementById("totalClientes");
const ahorro = document.getElementById("ahorro");
const nomina = document.getElementById("nomina");
const empresarial = document.getElementById("empresarial");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const cliente = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        cuenta: document.getElementById("cuenta").value,
        tipoCliente: document.getElementById("tipoCliente").value
    };

    const respuesta = await fetch("/api/clientes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
});

    const datos = await respuesta.json();

    const mensaje = document.createElement("div");

        mensaje.className = "mensaje-exito";

        mensaje.innerHTML = `
        ✅ Cliente registrado correctamente<br>
        ID asignado: ${datos.cliente.id}
        `;

        formulario.prepend(mensaje);

        setTimeout(() => {
            mensaje.remove();
        }, 5000);

    formulario.reset();

    cargarClientes();

});

async function cargarClientes() {

    const respuesta = await fetch("/api/clientes");

    const clientes = await respuesta.json();

    tablaClientes.innerHTML = "";

    let ahorroCount = 0;
    let nominaCount = 0;
    let empresarialCount = 0;

    clientes.forEach(cliente => {

        if (cliente.cuenta === "Ahorro") {
            ahorroCount++;
        }

        if (cliente.cuenta === "Nómina") {
            nominaCount++;
        }

        if (cliente.cuenta === "Empresarial") {
            empresarialCount++;
        }

        tablaClientes.innerHTML += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.cuenta}</td>
                <td>${cliente.tipoCliente}</td>
                <td>${cliente.fechaRegistro}</td>
            </tr>
        `;
    });

    totalClientes.textContent = clientes.length;
    ahorro.textContent = ahorroCount;
    nomina.textContent = nominaCount;
    empresarial.textContent = empresarialCount;
}

cargarClientes();