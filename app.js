// Importar las funciones necesarias desde Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


// Configuración de Firebase (reemplaza con tu propia configuración)
const firebaseConfig = {
  apiKey: "AIzaSyAnD1TRX5AcgXnibfRsINP9tLB154aY988",
  authDomain: "taller-dmr.firebaseapp.com",
  projectId: "taller-dmr",
  storageBucket: "taller-dmr.appspot.com",
  messagingSenderId: "531321320680",
  appId: "1:531321320680:web:b212644b5f63f7f1ad855d",
  measurementId: "G-CBDV1Q4R89"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

console.log('Firebase inicializado correctamente');
const db = firebase.firestore();

// Función para mostrar secciones
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// ========== Gestión de Vehículos ==========
const vehiculoForm = document.getElementById('vehiculo-form');
vehiculoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const matricula = document.getElementById('matricula').value;
    const año = document.getElementById('año').value;

    db.collection('vehiculos').add({
        marca: marca,
        modelo: modelo,
        matricula: matricula,
        año: año
    }).then(() => {
        alert('Vehículo agregado');
        vehiculoForm.reset();
        listarVehiculos();
    }).catch(error => {
        console.error('Error al agregar vehículo: ', error);
    });
});

// Listar Vehículos
function listarVehiculos() {
    const vehiculosList = document.getElementById('vehiculos-list');
    vehiculosList.innerHTML = '';

    db.collection('vehiculos').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const vehiculo = doc.data();
            vehiculosList.innerHTML += `<p>${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.matricula})</p>`;
        });
    });
}

listarVehiculos();

// ========== Gestión de Clientes ==========
const clienteForm = document.getElementById('cliente-form');
clienteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre-cliente').value;
    const telefono = document.getElementById('telefono-cliente').value;
    const email = document.getElementById('email-cliente').value;

    db.collection('clientes').add({
        nombre: nombre,
        telefono: telefono,
        email: email
    }).then(() => {
        alert('Cliente agregado');
        clienteForm.reset();
        listarClientes();
    }).catch(error => {
        console.error('Error al agregar cliente: ', error);
    });
});

function listarClientes() {
    const clientesList = document.getElementById('clientes-list');
    clientesList.innerHTML = '';

    db.collection('clientes').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const cliente = doc.data();
            clientesList.innerHTML += `<p>${cliente.nombre} - ${cliente.telefono}</p>`;
        });
    });
}

listarClientes();

// ========== Gestión de Órdenes ==========
const ordenForm = document.getElementById('orden-form');
ordenForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const descripcion = document.getElementById('descripcion-orden').value;
    const vehiculoId = document.getElementById('vehiculo-orden').value;
    const clienteId = document.getElementById('cliente-orden').value;

    db.collection('ordenes').add({
        descripcion: descripcion,
        vehiculoId: vehiculoId,
        clienteId: clienteId
    }).then(() => {
        alert('Orden agregada');
        ordenForm.reset();
        listarOrdenes();
    }).catch(error => {
        console.error('Error al agregar orden: ', error);
    });
});

function listarOrdenes() {
    const ordenesList = document.getElementById('ordenes-list');
    ordenesList.innerHTML = '';

    db.collection('ordenes').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const orden = doc.data();
            ordenesList.innerHTML += `<p>Orden: ${orden.descripcion}</p>`;
        });
    });
}

listarOrdenes();

// ========== Gestión de Inventario ==========
const inventarioForm = document.getElementById('inventario-form');
inventarioForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pieza = document.getElementById('pieza').value;
    const cantidad = document.getElementById('cantidad').value;

    db.collection('inventario').add({
        pieza: pieza,
        cantidad: cantidad
    }).then(() => {
        alert('Pieza agregada');
        inventarioForm.reset();
        listarInventario();
    }).catch(error => {
        console.error('Error al agregar pieza: ', error);
    });
});

function listarInventario() {
    const inventarioList = document.getElementById('inventario-list');
    inventarioList.innerHTML = '';

    db.collection('inventario').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const item = doc.data();
            inventarioList.innerHTML += `<p>${item.pieza} - Cantidad: ${item.cantidad}</p>`;
        });
    });
}

listarInventario();

// ========== Facturación ==========
const facturaForm = document.getElementById('factura-form');
facturaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const ordenId = document.getElementById('orden-factura').value;
    const total = document.getElementById('total-factura').value;

    db.collection('facturas').add({
        ordenId: ordenId,
        total: total
    }).then(() => {
        alert('Factura generada');
        facturaForm.reset();
        listarFacturas();
    }).catch(error => {
        console.error('Error al generar factura: ', error);
    });
});

function listarFacturas() {
    const facturasList = document.getElementById('facturas-list');
    facturasList.innerHTML = '';

    db.collection('facturas').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const factura = doc.data();
            facturasList.innerHTML += `<p>Factura: Orden ID: ${factura.ordenId}, Total: ${factura.total}</p>`;
        });
    });
}

listarFacturas();

// ========== Cotizaciones ==========
const cotizacionForm = document.getElementById('cotizacion-form');
cotizacionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const descripcion = document.getElementById('descripcion-cotizacion').value;
    const precio = document.getElementById('precio-cotizacion').value;

    db.collection('cotizaciones').add({
        descripcion: descripcion,
        precio: precio
    }).then(() => {
        alert('Cotización generada');
        cotizacionForm.reset();
        listarCotizaciones();
    }).catch(error => {
        console.error('Error al generar cotización: ', error);
    });
});

function listarCotizaciones() {
    const cotizacionesList = document.getElementById('cotizaciones-list');
    cotizacionesList.innerHTML = '';

    db.collection('cotizaciones').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const cotizacion = doc.data();
            cotizacionesList.innerHTML += `<p>Cotización: ${cotizacion.descripcion}, Precio: ${cotizacion.precio}</p>`;
        });
    });
}

listarCotizaciones();
