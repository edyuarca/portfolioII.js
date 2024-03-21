// Obtener todos los botones de edición de categoría
const editarCategoriaBtns = document.querySelectorAll('.editar-categoria-btn');

// Agregar un evento de clic a cada botón de edición de categoría
editarCategoriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Obtener el ID único del div de edición de categoría correspondiente
        const categoria = btn.getAttribute('data-categoria');
        const editarCategoriaDiv = document.getElementById(`editarCategoriaDiv-${categoria}`);
        const categoriasDiv = document.getElementById('box2'); // Obtener el div de categorías

        // Ocultar el div de categorías
        categoriasDiv.style.display = 'none';

        // Mostrar el div de edición de categoría correspondiente
        editarCategoriaDiv.style.display = 'block';
    });
});

// Obtener todos los botones del menú
const menuBtns = document.querySelectorAll('.opcion');

// Agregar un evento de clic a cada botón del menú
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Obtener el ID del div correspondiente a este botón
        const targetDivId = btn.getAttribute('data-target');
        
        // Ocultar todos los divs excepto el div del objetivo
        document.querySelectorAll('[data-box]').forEach(div => {
            if (div.id === targetDivId) {
                div.style.display = 'block'; // Mostrar el div objetivo
            } else {
                div.style.display = 'none'; // Ocultar otros divs
            }
        });
    });
});

// Obtener el botón de cancelar
const cancelarCategoriaBtn = document.getElementById('cancelar-categoria-boton');

// Agregar un evento de clic al botón de cancelar
cancelarCategoriaBtn.addEventListener('click', () => {
    // Ocultar el div de edición de categoría
    document.querySelectorAll('[id^="editarCategoriaDiv"]').forEach(div => {
        div.style.display = 'none';
    });

    // Mostrar el div de categorías
    document.getElementById('box2').style.display = 'block';
});