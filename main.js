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

//Contendor operaciones vacío a agregar nueva operación
const containerOperaciones = document.getElementById("containerOperaciones");
const btnNuevaOperacion = document.getElementById("btnAgregarOperacion");
const containerNuevaOp = document.getElementById("containerNuevaOp");
const containerVacio = document.getElementById("containerVacio");
const contenedorBalances = document.getElementById("contenedorBalances");

const vercontainerNuevaOp = () => {
  containerNuevaOp.classList.remove("hidden");
  containerOperaciones.classList.add("hidden");
  contenedorBalances.classList.add("hidden");
  console.log("ventana oculta");
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
const operaciones = document.getElementById("operaciones");
const tablaOperaciones = document.getElementById("tablaOperaciones");

let datos = [];

const evaluarLocalStorage = () => {
  if (localStorage.getItem("operaciones") !== null) {
    const operacionesGuardadas = JSON.parse(
      localStorage.getItem("operaciones")
    );
    return operacionesGuardadas;
  } else {
    localStorage.setItem("operaciones", JSON.stringify(datos));
  }
  generarTabla();
};

formNuevaOperacion.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Formulario enviado");

  const OperacionNueva = {
    id: uuidv4(),
    descripcion: campoDescripcion.value,
    monto: monto.value,
    tipo: tipo.value,
    categoria: categoria.value,
    fecha: fecha.value,
  };
  console.log(categoria.value);
  console.log("Datos de la nueva operación:", OperacionNueva);
  datos = evaluarLocalStorage() || [];
  datos.push(OperacionNueva);
  localStorage.setItem("operaciones", JSON.stringify(datos));

  containerNuevaOp.classList.add("hidden");
  containerVacio.classList.add("hidden");
  contenedorBalances.classList.remove("hidden");
  containerOperaciones.classList.remove("hidden");
  tablaOperaciones.classList.remove("hidden");

  generarTabla();
});

//boton cancelar envío

const pagPricinpal = () => {
  containerNuevaOp.classList.add("hidden");
  containerOperaciones.classList.remove("hidden");
  contenedorBalances.classList.remove("hidden");
};

btnCancelarOpTabla.addEventListener("click", pagPricinpal);

//creación de tabla
console.log(operaciones);
const generarTabla = () => {
  operaciones.innerHTML = "";
  console.log(evaluarLocalStorage());
  if (evaluarLocalStorage()) {
    console.log("hola");
    for (let operacion of evaluarLocalStorage()) {
      console.log(operacion.categoria);
      operaciones.innerHTML += `
        
          
          <span>${operacion.descripcion}</span>
          <span>${operacion.categoria}</span>
          <span>${operacion.fecha}</span>
          <span>${operacion.monto}</span>
          <div>
          <button class="w-9 h-9"><img src="imagenes/icon-edit.svg" alt=""></button>
          <button class="w-9 h-9"><img src="imagenes/icon-delete.svg" alt=""></button>
          </div>
        
        
        `;
    }
  }
  console.log("Tabla generada correctamente");
};
generarTabla();

//Botones editar y eliminar operación

const btnEditarOp = document.getElementById("btnEditarOp");
const btnEliminarOp = document.getElementById("btnEliminarOp");

// const generarTablaMod = () => {
// if (localStorage.getItem("operaciones") !== null) {
//   const operaciones = JSON.parse(localStorage.getItem("operaciones"));
//  const encontrarOp = operaciones.find((op) => op.id === id);
//  return encontrarOp;
// } else {
//  console.log("No hay operaciones guardadas en el localStorage.");
// }
// };

btnEditarOp.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Formulario enviado");

  const OperacionNueva = {
    id: uuidv4(),
    descripcion: campoDescripcion.value,
    monto: monto.value,
    tipo: tipo.value,
    categoria: categoria.value,
    fecha: fecha.value,
  };
  console.log(categoria.value);
  console.log("Datos de la nueva operación:", OperacionNueva);
  datos = evaluarLocalStorage() || [];
  datos.push(OperacionNueva);
  localStorage.setItem("operaciones", JSON.stringify(datos));

  containerNuevaOp.classList.add("hidden");
  containerVacio.classList.add("hidden");
  contenedorBalances.classList.remove("hidden");
  containerOperaciones.classList.remove("hidden");
  tablaOperaciones.classList.remove("hidden");

  generarTabla();
});
//btnEliminarOp.addEventListener("click");
