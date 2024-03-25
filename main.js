//FILTROS

document.addEventListener("DOMContentLoaded", function() {
    var toggleFiltros = document.getElementById("toggle-filtros");
    var filtros = document.getElementById("filtros");

    toggleFiltros.addEventListener("click", function(event) {
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

//Contendor operaciones vacío a agregar nueva operación
const btnNuevaOperacion = document.getElementById("btnAgregarOperacion");
const contNuevaOp = document.getElementById("contNuevaOp");
const contVacio = document.getElementById("contVacio");
const contBalancesFiltros = document.getElementById("contBalancesFiltros");

const vercontainerNuevaOp = () => {
  contNuevaOp.classList.remove("hidden");
  contVacio.style.display = "none";
  contBalancesFiltros.style.display = "none";
};
btnNuevaOperacion.addEventListener(`click`, vercontainerNuevaOp);

//Agregar tabla

const nuevaOperacionForm = document.getElementById("nuevaOperacionForm");

// const categorias = document.getElementById("categorias");
// const datos = [];

const evaluarLocalStorage = () => {
  if (localStorage.getItem("operaciones") !== null) {
    operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones"));
    return operacionesGuardadas;
  } else {
    localStorage.setItem("operaciones", JSON.stringify(datos));
  }
};

