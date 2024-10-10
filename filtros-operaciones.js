document.getElementById('tipo').addEventListener('change', aplicarFiltros);
document.getElementById('categoria').addEventListener('change', aplicarFiltros);
document.getElementById('fecha').addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    const filtroTipo = document.getElementById('tipo').value.toLowerCase();
    const filtroCategoria = document.getElementById('categoria').value.toLowerCase();
    const filtroFecha = document.getElementById('fecha').value;

 
    let operacionesFiltradas = operaciones.filter(op => {
        const coincideTipo = filtroTipo === 'todos' || op.tipo === filtroTipo;
        const coincideCategoria = filtroCategoria === 'todas' || op.categoria.toLowerCase() === filtroCategoria;
        const coincideFecha = !filtroFecha || op.fecha === filtroFecha;

        return coincideTipo && coincideCategoria && coincideFecha;
    });

    mostrarOperacionesFiltradas(operacionesFiltradas);


    guardarOperaciones(); 
}

function mostrarOperacionesFiltradas(operacionesFiltradas) {
    const operacionesLista = document.getElementById('operaciones-lista');
    operacionesLista.innerHTML = '';

    operacionesFiltradas.forEach((operacion, index) => {
        const indexEnOperaciones = operaciones.indexOf(operacion);
        agregarOperacionADOM(indexEnOperaciones);
    });
}

function agregarOperacionADOM(index) {
    const operacion = operaciones[index]; // Obtener la operación en función del índice
    const operacionDiv = document.createElement('div');
    operacionDiv.className = 'bg-gray-100 p-4 rounded mt-4';

    // Verifica si operacion es válida
    if (operacion) {
        operacionDiv.innerHTML = `
            <h3 class="text-lg font-bold">${operacion.descripcion || 'Sin descripción'}</h3>
            <p>Monto: $${operacion.monto || 0}</p>
            <p>Tipo: ${operacion.tipo ? operacion.tipo.charAt(0).toUpperCase() + operacion.tipo.slice(1) : 'Tipo desconocido'}</p>
            <p>Categoría: ${operacion.categoria || 'Sin categoría'}</p>
            <p>Fecha: ${operacion.fecha || 'Sin fecha'}</p>
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
    } else {
        console.error(`Operación no encontrada para el índice ${index}`);
    }
}