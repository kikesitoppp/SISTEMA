// Datos de usuarios
const usuarios = {
    'Kike': '123456'
};

// Lista de transacciones
let transacciones = [];

// Inventario de productos
let inventario = {};

// Autenticar usuario
function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    
    if (usuarios[usuario] && usuarios[usuario] === contraseña) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('acciones-section').style.display = 'block';
    } else {
        document.getElementById('error-msg').innerText = 'Usuario o contraseña incorrectos';
    }
}

// Agregar o actualizar stock de producto
function actualizarStock() {
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    if (producto && cantidad >= 0) {
        inventario[producto] = cantidad;
        document.getElementById('stock-msg').innerText = `Stock actualizado: ${producto} tiene ${cantidad} unidades.`;
        mostrarStock(); // Actualizar la lista de stock en pantalla
    } else {
        document.getElementById('stock-msg').innerText = 'Por favor, ingresa un producto y una cantidad válida.';
    }
}

// Agregar transacción y reducir stock
function agregarTransaccion() {
    const referencia = document.getElementById('referencia').value;
    const valor = parseFloat(document.getElementById('valor').value);
    
    if (referencia && valor && inventario[referencia] > 0) {
        inventario[referencia] -= 1; // Reducir el stock en 1
        const fecha = new Date();
        const transaccion = { referencia, valor, fecha };
        transacciones.push(transaccion);
        
        document.getElementById('transaccion-msg').innerText = `Transacción agregada. Stock restante de ${referencia}: ${inventario[referencia]}`;
        document.getElementById('transaccion-section').style.display = 'none';
        mostrarStock(); // Actualizar el inventario visualmente
    } else {
        document.getElementById('transaccion-msg').innerText = 'Stock insuficiente o datos incompletos.';
    }
}

// Generar resumen diario de ventas
function generarResumen() {
    const hoy = new Date().toISOString().split('T')[0];
    const ventasHoy = transacciones.filter(t => t.fecha.toISOString().split('T')[0] === hoy).map(t => t.valor);
    
    const totalVentas = ventasHoy.reduce((total, valor) => total + valor, 0);
    const promedioVentas = ventasHoy.length > 0 ? (totalVentas / ventasHoy.length).toFixed(2) : 0;
    
    document.getElementById('resumen-total').innerText = `Total de ventas del día: $${totalVentas}`;
    document.getElementById('resumen-promedio').innerText = `Promedio de ventas del día: $${promedioVentas}`;
    document.getElementById('resumen-section').style.display = 'block';
}

// Mostrar inventario de productos
function mostrarStock() {
    const stockSection = document.getElementById('stock-list');
    stockSection.innerHTML = '';
    
    for (const [producto, existencias] of Object.entries(inventario)) {
        const productoInfo = document.createElement('p');
        productoInfo.innerText = `${producto}: ${existencias} en stock`;
        stockSection.appendChild(productoInfo);
    }
}

// Mostrar formulario para agregar transacción
function mostrarAgregarTransaccion() {
    document.getElementById('transaccion-section').style.display = 'block';
    document.getElementById('resumen-section').style.display = 'none';
}

// Cerrar sesión
function cerrarSesion() {
    document.getElementById('acciones-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}
