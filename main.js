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
