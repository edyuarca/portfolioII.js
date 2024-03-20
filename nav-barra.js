document.addEventListener('DOMContentLoaded', function () {
    const opciones = document.querySelectorAll('.opcion');
    const boxes = document.querySelectorAll('[data-box]');
  
    // Función para mostrar la sección correspondiente y ocultar las demás
    function mostrarSeccion(targetBox) {
      boxes.forEach(box => {
        if (box.id === targetBox) {
          box.classList.remove('hidden');
        } else {
          box.classList.add('hidden');
        }
      });
    }
  
    // Manejar clics en los botones de opciones
    opciones.forEach(opcion => {
      opcion.addEventListener('click', function () {
        const targetBoxId = opcion.getAttribute('data-target');
        mostrarSeccion(targetBoxId);
      });
    });
  });