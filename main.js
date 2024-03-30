//FILTROS

document.addEventListener("DOMContentLoaded", function () {
  let toggleFiltros = document.getElementById("toggle-filtros");
  let filtros = document.getElementById("filtros");

  toggleFiltros.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Verifica el estado actual de los filtros
    if (filtros.style.display === "none") {
      // Si están ocultos, muestra los filtros
      filtros.style.display = "block";
      toggleFiltros.textContent = "Ocultar filtros";
    } else {
      // Si están visibles, oculta los filtros
      filtros.style.display = "none";
      toggleFiltros.textContent = "Mostrar filtros";
    }
  });
});

