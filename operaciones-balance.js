//FILTROS ocultar/mostrar

document.addEventListener("DOMContentLoaded", function () {
  var toggleFiltros = document.getElementById("toggle-filtros");
  var filtros = document.getElementById("filtros");

  toggleFiltros.addEventListener("click", function (event) {
    event.preventDefault();

    if (filtros.style.display === "none") {
      filtros.style.display = "block";
      toggleFiltros.textContent = "Ocultar filtros";
    } else {
      filtros.style.display = "none";
      toggleFiltros.textContent = "Mostrar filtros";
    }
  });
});
