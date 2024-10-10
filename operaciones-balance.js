let operaciones = [];
let operacionEditando = null;

function cargarOperaciones() {
    const operacionesGuardadas = localStorage.getItem('operaciones');
    if (operacionesGuardadas) {
        operaciones = JSON.parse(operacionesGuardadas);
        operaciones.forEach((operacion, index) => {
            agregarOperacionADOM(index);
        });
        actualizarBalance();
    }
}

function guardarOperaciones() {
    localStorage.setItem('operaciones', JSON.stringify(operaciones));
}

function showSection(sectionId) {
    document.getElementById('balance-filtros-operaciones').classList.add('hidden');
    document.getElementById('categorias').classList.add('hidden');
    document.getElementById('reportes').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('nueva-operacion').classList.add('hidden');
}

function toggleNuevaOperacion() {
    const nuevaOperacionBox = document.getElementById('nueva-operacion');
    nuevaOperacionBox.classList.toggle('hidden');
    const mainSection = document.getElementById('balance-filtros-operaciones');
    if (!nuevaOperacionBox.classList.contains('hidden')) {
        mainSection.classList.add('hidden');
    } else {
        mainSection.classList.remove('hidden');
    }
}

function cancelarOperacion() {
    operacionEditando = null;
    document.getElementById('nueva-operacion-form').reset();
    toggleNuevaOperacion();
    showSection('balance-filtros-operaciones');
}

function actualizarBalance() {
    const ganancias = operaciones.filter(op => op.tipo === 'ganancia').reduce((acc, op) => acc + parseFloat(op.monto), 0);
    const gastos = operaciones.filter(op => op.tipo === 'gasto').reduce((acc, op) => acc + parseFloat(op.monto), 0);
    const total = ganancias - gastos;

    document.getElementById('ganancias').innerText = `Ganancias: $${ganancias.toFixed(2)}`;
    document.getElementById('gastos').innerText = `Gastos: $${gastos.toFixed(2)}`;
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function agregarOperacion() {
    const descripcion = document.getElementById('descripcion').value;
    const monto = document.getElementById('monto').value;
    const tipo = document.getElementById('tipo-operacion').value;
    const categoria = document.getElementById('categoria-operacion').value;
    const fecha = document.getElementById('fecha-operacion').value;

    if (operacionEditando !== null) {
        operaciones[operacionEditando] = { descripcion, monto, tipo, categoria, fecha };
        actualizarOperacionEnDOM(operacionEditando);
    } else {
        const nuevaOperacion = { descripcion, monto, tipo, categoria, fecha };
        operaciones.push(nuevaOperacion);
        agregarOperacionADOM(operaciones.length - 1);
    }

    document.getElementById('nueva-operacion-form').reset();
    toggleNuevaOperacion();
    actualizarBalance();
    operacionEditando = null; 

    guardarOperaciones(); 
}

function agregarOperacionADOM(index) {
    const operacion = operaciones[index];
    const operacionDiv = document.createElement('div');
    operacionDiv.className = 'bg-gray-100 p-4 rounded mt-4';

    operacionDiv.innerHTML = `
        <h3 class="text-lg font-bold">${operacion.descripcion}</h3>
        <p>Monto: $${operacion.monto}</p>
        <p>Tipo: ${operacion.tipo.charAt(0).toUpperCase() + operacion.tipo.slice(1)}</p>
        <p>Categoría: ${operacion.categoria}</p>
        <p>Fecha: ${operacion.fecha}</p>
        <div class="flex justify-end space-x-2 mt-2">
            <button class="bg-violet-500 text-white px-2 py-1 rounded hover:bg-violet-600" onclick="editarOperacion(${index})">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="eliminarOperacion(this, ${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;
    document.getElementById('operaciones-lista').appendChild(operacionDiv);
}

function actualizarOperacionEnDOM(index) {
    const operacion = operaciones[index];
    const operacionDiv = document.getElementById('operaciones-lista').children[index];

    operacionDiv.innerHTML = `
        <h3 class="text-lg font-bold">${operacion.descripcion}</h3>
        <p>Monto: $${operacion.monto}</p>
        <p>Tipo: ${operacion.tipo.charAt(0).toUpperCase() + operacion.tipo.slice(1)}</p>
        <p>Categoría: ${operacion.categoria}</p>
        <p>Fecha: ${operacion.fecha}</p>
        <div class="flex justify-end space-x-2 mt-2">
            <button class="bg-violet-500 text-white px-2 py-1 rounded hover:bg-violet-600" onclick="editarOperacion(${index})">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="eliminarOperacion(this, ${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;
}

function eliminarOperacion(button, index) {
    // Eliminar la operación del array
    operaciones.splice(index, 1); 

    // Eliminar el elemento del DOM
    const operacionDiv = button.closest('.bg-gray-100'); // Encuentra el div correcto
    operacionDiv.remove(); // Elimina la operación del DOM

    // Actualizar balance después de eliminar
    actualizarBalance(); 
    
    guardarOperaciones();
}

function editarOperacion(index) {
    const operacion = operaciones[index];
    document.getElementById('descripcion').value = operacion.descripcion;
    document.getElementById('monto').value = operacion.monto;
    document.getElementById('tipo-operacion').value = operacion.tipo;
    document.getElementById('categoria-operacion').value = operacion.categoria;
    document.getElementById('fecha-operacion').value = operacion.fecha;

    operacionEditando = index;
    toggleNuevaOperacion();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarOperaciones(); 
});