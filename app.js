const usuarios = {
    admin: "1234"
};

function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const errorMsg = document.getElementById("error-msg");

    if (usuarios[usuario] && usuarios[usuario] === contraseña) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("acciones-section").style.display = "block";
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
}

function cerrarSesion() {
    document.getElementById("acciones-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

let inventario = {};

function mostrarControlStock() {
    document.getElementById("control-stock-section").style.display = "block";
    actualizarInventario();
}

function actualizarStock() {
    const producto = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const stockMsg = document.getElementById("stock-msg");

    if (producto && cantidad >= 0) {
        inventario[producto] = (inventario[producto] || 0) + cantidad;
        stockMsg.textContent = `El stock de ${producto} ha sido actualizado a ${inventario[producto]} unidades.`;
        actualizarInventario();
    } else {
        stockMsg.textContent = "Por favor ingrese un producto y una cantidad válida.";
    }
}

function actualizarInventario() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "";
    for (const [producto, cantidad] of Object.entries(inventario)) {
        const item = document.createElement("p");
        item.textContent = `${producto}: ${cantidad} unidades`;
        stockList.appendChild(item);
    }
}

function mostrarAgregarTransaccion() {
    document.getElementById("transaccion-section").style.display = "block";
}

function agregarTransaccion() {
    const referencia = document.getElementById("referencia").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const transaccionMsg = document.getElementById("transaccion-msg");

    if (referencia && valor > 0) {
        if (inventario[referencia] && inventario[referencia] > 0) {
            inventario[referencia] -= 1;
            actualizarInventario();
            transaccionMsg.textContent = `Transacción agregada: ${referencia} por un valor de $${valor.toFixed(2)}.`;
        } else {
            transaccionMsg.textContent = `No hay suficiente stock de ${referencia}.`;
        }
    } else {
        transaccionMsg.textContent = "Por favor ingrese una referencia y un valor válido.";
    }
}

let transacciones = [];

function generarResumen() {
    const total = transacciones.reduce((acc, t) => acc + t.valor, 0);
    const promedio = transacciones.length > 0 ? total / transacciones.length : 0;

    document.getElementById("resumen-total").textContent = `Total de transacciones: $${total.toFixed(2)}`;
    document.getElementById("resumen-promedio").textContent = `Promedio de transacción: $${promedio.toFixed(2)}`;
    document.getElementById("resumen-section").style.display = "block";
}

const net = new brain.NeuralNetwork();

function entrenarModelo() {
    const demandaPasada = parseFloat(document.getElementById("demandaPasada").value) / 100;
    net.train([{ input: { demandaPasada }, output: { demandaFutura: demandaPasada + 0.1 } }]);
    alert("Modelo entrenado con los datos ingresados.");
}

function calcularPronostico() {
    const demandaPasada = parseFloat(document.getElementById("demandaPasada").value) / 100;
    const resultado = net.run({ demandaPasada });
    document.getElementById("pronostico-msg").textContent = `Pronóstico de demanda: ${(resultado.demandaFutura * 100).toFixed(2)}%`;
}
