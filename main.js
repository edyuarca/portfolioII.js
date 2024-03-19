//Contendor operaciones vacío a agregar nueva operación
const btnNuevaOperacion = document.getElementById("btnAgregarOperacion");
const containerNuevaOp = document.getElementById("containerNuevaOp");
const containerVacio = document.getElementById("containerVacio");
const contenedorBalances = document.getElementById("contenedorBalances");

const vercontainerNuevaOp = () => {
  containerNuevaOp.classList.remove("hidden");
  containerVacio.classList.add("hidden");
  contenedorBalances.classList.add("hidden");
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

  formNuevaOperacion.classList.add("hidden");
  contenedorBalances.classList.remove("hidden");
  tablaOperaciones.classList.remove("hidden");

  generarTabla();
});

//boton cancelar envío

const pagPricinpal = () => {
  containerNuevaOp.style.display = "none";
  containerVacio.style.display = "block";
  contenedorBalances.style.display = "block";
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
        <div>
          <span>${operacion.descripcion}</span>
          <span>${operacion.categoria}</span>
          <span>${operacion.fecha}</span>
          <span>${operacion.monto}</span>

        </div>
        `;
    }
  }
  console.log("Tabla generada correctamente");
};
generarTabla();
