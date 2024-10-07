// Datos de usuarios
const usuarios = {
    'Kike': '123456'
};

// Lista de transacciones
let transacciones = [];

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

// Agregar transacción
function agregarTransaccion() {
    const referencia = document.getElementById('referencia').value;
    const valor = parseFloat(document.getElementById('valor').value);
    
    if (referencia && valor) {
        const fecha = new Date();
        const transaccion = { referencia, valor, fecha };
        transacciones.push(transaccion);
        
        document.getElementById('transaccion-msg').innerText = 'Transacción agregada';
        document.getElementById('transaccion-section').style.display = 'none';
    }
}

// Generar resumen
function generarResumen() {
    const hoy = new Date().toISOString().split('T')[0];
    const ventasHoy = transacciones.filter(t => t.fecha.toISOString().split('T')[0] === hoy).map(t => t.valor);
    
    const totalVentas = ventasHoy.reduce((total, valor) => total + valor, 0);
    const promedioVentas = ventasHoy.length > 0 ? (totalVentas / ventasHoy.length).toFixed(2) : 0;
    
    document.getElementById('resumen-total').innerText = `Total de ventas del día: $${totalVentas}`;
    document.getElementById('resumen-promedio').innerText = `Promedio de ventas del día: $${promedioVentas}`;
    document.getElementById('resumen-section').style.display = 'block';
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
