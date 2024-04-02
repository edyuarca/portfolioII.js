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

// funcionalidad balances

const ingresos = document.getElementById("ingreso");
const gastos = document.getElementById("gastos");
const totalBalances = document.getElementById("totalBalances");

//Tabla de operaciones

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

let total = 0;

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

  const balancesOperaciones = (tipo, monto) => {
    if (tipo === "gasto") {
      total = total - parseFloat(monto);
      gastos.innerText = parseFloat(gastos.textContent) + parseFloat(monto);
    } else if (tipo === "ingreso") {
      total = total + parseFloat(monto);
      ingresos.innerText = parseFloat(ingresos.textContent) + parseFloat(monto);
    }
    totalBalances.innerText = total;
  };
  balancesOperaciones(OperacionNueva.tipo, OperacionNueva.monto);
  console.log("balances", balancesOperaciones);

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
          <button class="w-9 h-9" id="btnEditarOp"><img src="imagenes/icon-edit.svg" alt=""></button>
          <button class="w-9 h-9" id="btnEliminarOp"><img src="imagenes/icon-delete.svg" alt=""></button>
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

const obtenerIdOperacionAEditar = () => {
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones"));
  if (operacionesGuardadas !== null) {
    operacionesGuardadas.find((OperacionNueva) => OperacionNueva.id === id);
  }
};

const traerOpaEditar = () => {
  vercontainerNuevaOp();
  operaciones.innerHTML = "";

  const operacionAEditar = obtenerIdOperacionAEditar();
  console.log("funciona evento id a editar");

  campoDescripcion.value = operacionAEditar.descripcion;
  monto.value = operacionAEditar.monto;
  tipo.value = operacionAEditar.tipo;
  categoria.value = operacionAEditar.categoria;
  fecha.value = operacionAEditar.fecha;

  return operacionAEditar;
};

btnEditarOp.addEventListener("click", traerOpaEditar);
