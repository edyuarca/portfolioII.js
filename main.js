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

const categorias = document.getElementById("categorias");
const datos = [];
const evaluarLocalStorage = () => {
  if (localStorage.getItem("operaciones") !== null) {
    operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones"));
    return operacionesGuardadas;
  } else {
    localStorage.setItem("operaciones", JSON.stringify(datos));
  }
};
