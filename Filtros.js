//FILTROS OCULTAR Y MOSTRAR

document.addEventListener("DOMContentLoaded", function () {
  let ocultoFiltros = document.getElementById("ocultar-filtros");
  let filtros = document.getElementById("filtros");

  ocultoFiltros.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Verifica el estado actual de los filtros
    if (filtros.style.display === "none") {
      // Si están ocultos, muestra los filtros
      filtros.style.display = "block";
      ocultoFiltros.textContent = "Ocultar filtros";
    } else {
      // Si están visibles, oculta los filtros
      filtros.style.display = "none";
      ocultoFiltros.textContent = "Mostrar filtros";
    }
  });
});

