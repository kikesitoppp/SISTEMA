// Simulación de datos de autenticación
const usuarios = {
    admin: "1234"
};

// Manejar inicio de sesión
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

// Cerrar sesión
function cerrarSesion() {
    document.getElementById("acciones-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Manejo de stock
let inventario = {};

function mostrarControlStock() {
    document.getElementById("control-stock-section").style.display = "block";
}

function actualizarStock() {
    const producto = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const stockMsg = document.getElementById("stock-msg");

    if (producto && cantidad >= 0) {
        inventario[producto] = cantidad;
        stockMsg.textContent = `El stock de ${producto} ha sido actualizado a ${cantidad} unidades.`;
        actualizarInventario();
    } else {
        stockMsg.textContent = "Por favor ingrese un producto y una cantidad válida.";
    }
}

// Mostrar inventario
function actualizarInventario() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "<h2>Inventario de Productos</h2>";
    
    for (const [producto, cantidad] of Object.entries(inventario)) {
        const item = document.createElement("p");
        item.textContent = `${producto}: ${cantidad} unidades`;
        stockList.appendChild(item);
    }
}

// Manejo de transacciones
let transacciones = [];

function mostrarAgregarTransaccion() {
    document.getElementById("transaccion-section").style.display = "block";
}

function agregarTransaccion() {
    const referencia = document.getElementById("referencia").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const transaccionMsg = document.getElementById("transaccion-msg");

    if (referencia && valor > 0) {
        transacciones.push({ referencia, valor });
        transaccionMsg.textContent = `Transacción agregada: ${referencia} por un valor de $${valor.toFixed(2)}.`;
    } else {
        transaccionMsg.textContent = "Por favor ingrese una referencia y un valor válido.";
    }
}

// Resumen diario
function generarResumen() {
    const resumenSection = document.getElementById("resumen-section");
    const total = transacciones.reduce((acc, t) => acc + t.valor, 0);
    const promedio = transacciones.length > 0 ? total / transacciones.length : 0;

    document.getElementById("resumen-total").textContent = `Total de transacciones: $${total.toFixed(2)}`;
    document.getElementById("resumen-promedio").textContent = `Promedio de transacción: $${promedio.toFixed(2)}`;
    resumenSection.style.display = "block";
}

// Pronóstico de demanda con red neuronal
function mostrarPronostico() {
    document.getElementById("pronostico-section").style.display = "block";
}

function calcularPronostico() {
    const net = new brain.NeuralNetwork();

    // Entrenamiento básico
    net.train([
        { input: { demandaPasada: 0.2 }, output: { demandaFutura: 0.3 } },
        { input: { demandaPasada: 0.4 }, output: { demandaFutura: 0.5 } },
        { input: { demandaPasada: 0.6 }, output: { demandaFutura: 0.7 } },
    ]);

    const resultado = net.run({ demandaPasada: 0.5 });
    document.getElementById("pronostico-msg").textContent = `Pronóstico de demanda: ${(resultado.demandaFutura * 100).toFixed(2)}%`;
}
