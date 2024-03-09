//Contendor operaciones vacío a agregar nueva operación
const btnNuevaOperacion = document.getElementById("btnAgregarOperacion");
const containerNuevaOp = document.getElementById("containerNuevaOp");
const containerVacio = document.getElementById("containerVacio");
const contenedorBalances = document.getElementById("contenedorBalances");

const vercontainerNuevaOp = () => {
  containerNuevaOp.style.display = "block";
  containerVacio.style.display = "none";
  contenedorBalances.style.display = "none";
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
