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

const formNuevaOperacion = document.getElementById("formNuevaOperacion");
const btnAgregarOpTabla = document.getElementById("btnAgregarOpTabla");
const btnCancelarOpTabla = document.getElementById("btnCancelarOpTabla");
const campoDescripcion = document.getElementById("campoDescripcion");
const monto = document.getElementById("monto");
const tipo = document.getElementById("tipo");
const categoria = document.getElementById("categoria");
const fecha = document.getElementById("fecha");

let datos = [];
console.log(datos);

formNuevaOperacion.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Formulario enviado");

  const OperacionNueva = {
    descripcion: campoDescripcion.value,
    monto: monto.value,
    tipo: tipo.value,
    categoria: categoria.value,
    fecha: fecha.value,
  };

  console.log("Datos de la nueva operación:", OperacionNueva);

  datos.push(OperacionNueva);
  localStorage.setItem("operaciones", JSON.stringify(datos));

  formNuevaOperacion.reset();
});

const evaluarLocalStorage = () => {
  if (localStorage.getItem("operaciones") !== null) {
    localStorage.getItem("operaciones", JSON.parse(datos));
    console.log("operaciones traidas del local:", operacionesGuardadas);
    return operacionesGuardadas;
  } else {
    localStorage.setItem("operaciones", JSON.stringify(datos));
  }
  generarTabla();
};

//boton cancelar envío

const pagPricinpal = () => {
  containerNuevaOp.style.display = "none";
  containerVacio.style.display = "block";
  contenedorBalances.style.display = "block";
};

btnCancelarOpTabla.addEventListener("click", pagPricinpal);
