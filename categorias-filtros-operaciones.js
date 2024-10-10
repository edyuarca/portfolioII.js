
let categorias = JSON.parse(localStorage.getItem('categorias')) || ['Comida', 'Servicios', 'Salidas', 'Trabajo'];

// Función para renderizar las categorías en la lista principal
function renderizarCategorias() {
    const listaCategorias = document.getElementById('lista-categorias');
    listaCategorias.innerHTML = ''; // Limpiar la lista
    categorias.forEach((categoria, index) => {
        const li = document.createElement('li');
        li.classList = "flex justify-between items-center bg-[var(--primary-color)] text-white px-4 py-2 rounded";
        li.innerHTML = `
            <span>${categoria}</span>
            <div class="space-x-2">
                <button class="bg-violet-500 text-white px-2 py-1 rounded hover:bg-violet-600" onclick="editarCategoria(${index})">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="eliminarCategoria(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        listaCategorias.appendChild(li);
    });
}

// Función para actualizar los selects de filtros y operaciones
function actualizarSelectCategorias() {
    const selectFiltro = document.getElementById('categoria');
    const selectCategoriaOperacion = document.getElementById('categoria-operacion');
    
    // Resetear las opciones
    selectFiltro.innerHTML = '<option>Todas</option>';
    selectCategoriaOperacion.innerHTML = '<option disabled selected>Selecciona una categoría</option>';

    // Agregar categorías al select de filtros y al de operaciones
    categorias.forEach(categoria => {
        const optionFiltro = document.createElement('option');
        optionFiltro.value = categoria;
        optionFiltro.innerText = categoria;
        selectFiltro.appendChild(optionFiltro);

        const optionOperacion = document.createElement('option');
        optionOperacion.value = categoria;
        optionOperacion.innerText = categoria;
        selectCategoriaOperacion.appendChild(optionOperacion);
    });
}


function agregarCategoria() {
    const inputCategoria = document.getElementById('nombre-categoria');
    const nuevaCategoria = inputCategoria.value.trim();

    if (nuevaCategoria && !categorias.includes(nuevaCategoria)) {
        categorias.push(nuevaCategoria);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        renderizarCategorias();
        actualizarSelectCategorias();
        inputCategoria.value = ''; // Limpiar el campo de texto
    } else if (categorias.includes(nuevaCategoria)) {
        alert('La categoría ya existe.');
    }
}


function eliminarCategoria(index) {
    categorias.splice(index, 1);
    localStorage.setItem('categorias', JSON.stringify(categorias));
    renderizarCategorias();
    actualizarSelectCategorias();
}


function editarCategoria(index) {
    const nuevaCategoria = prompt('Edita el nombre de la categoría:', categorias[index]);
    if (nuevaCategoria && nuevaCategoria.trim() !== '' && !categorias.includes(nuevaCategoria.trim())) {
        categorias[index] = nuevaCategoria.trim();
        localStorage.setItem('categorias', JSON.stringify(categorias));
        renderizarCategorias();
        actualizarSelectCategorias();
    } else if (categorias.includes(nuevaCategoria.trim())) {
        alert('La categoría ya existe.');
    }
}

// Cargar las categorías desde el localStorage al cargar la página
window.onload = function() {
    renderizarCategorias();
    actualizarSelectCategorias();
};

// Agregar evento al botón de agregar categoría
document.getElementById('btn-agregar-categoria').addEventListener('click', agregarCategoria);