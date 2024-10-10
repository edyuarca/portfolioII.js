document.getElementById('btn-generar-reporte').addEventListener('click', generarReporte);

function generarReporte() {
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    if (operaciones.length === 0) {
        console.log("No hay operaciones para generar un reporte.");
        // Puedes mostrar un mensaje al usuario aquí si lo deseas
        return;
    }

    // Inicializar variables para el resumen
    let mayorGanancia = { categoria: '', monto: 0 };
    let mayorGasto = { categoria: '', monto: 0 };
    let balancePorCategoria = {};

    operaciones.forEach(operacion => {
        const monto = parseFloat(operacion.monto); 
        // Determinar si es ganancia o gasto
        if (operacion.tipo === "ganancia") {
            if (monto > mayorGanancia.monto) {
                mayorGanancia = { categoria: operacion.categoria, monto: monto };
            }
        } else if (operacion.tipo === "gasto") {
            if (monto > mayorGasto.monto) {
                mayorGasto = { categoria: operacion.categoria, monto: monto };
            }
        }

        // Calcular el balance por categoría
        balancePorCategoria[operacion.categoria] = (balancePorCategoria[operacion.categoria] || 0) + monto;
    });

    // Renderizar el resumen
    document.getElementById('mayorGananciaCategoria').textContent = mayorGanancia.categoria || 'N/A';
    document.getElementById('mayorGananciaMonto').textContent = mayorGanancia.monto.toFixed(2) || 'N/A';
    document.getElementById('mayorGastoCategoria').textContent = mayorGasto.categoria || 'N/A';
    document.getElementById('mayorGastoMonto').textContent = mayorGasto.monto.toFixed(2) || 'N/A';

    // Calcular el balance total y actualizar el DOM
    let totalPorCategoria = Object.entries(balancePorCategoria)
        .map(([categoria, total]) => `${categoria}: $${total.toFixed(2)}`)
        .join(', ');

    document.getElementById('totalesCategoria').textContent = totalPorCategoria || 'N/A';
    
    // Mostrar el contenedor de reportes
    const resumenElement = document.querySelector('.bg-gray-100.rounded.p-4.shadow-sm.hidden');
    if (resumenElement) {
        resumenElement.classList.remove('hidden');
    }
}

// Asegúrate de que localStorage contiene datos válidos antes de ejecutar
console.log(JSON.parse(localStorage.getItem('operaciones')));