// Operaciones

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

const btnEliminarOp = document.querySelectorAll(".btnEliminarOp");
const btnEditarOp = document.querySelectorAll(".btnEditarOp");
const containerEditarOp = document.getElementById("containerEditarOp");

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

const balancesOperaciones = (tipo, monto) => {
  monto = parseFloat(monto); // Convertir el monto a número
  if (tipo === "gasto") {
    total = total - monto;
    gastos.innerText = parseFloat(gastos.textContent) + monto;
  } else if (tipo === "ingreso") {
    total = total + monto;
    ingresos.innerText = parseFloat(ingresos.textContent) + monto;
  }
  totalBalances.innerText = total;
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
  console.log("Valor de la categoría:", categoria.value);
  console.log("Datos de la nueva operación:", OperacionNueva);

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
  containerEditarOp.classList.add("hidden"); // Ocultar el div de editar operación
};

btnCancelarOpTabla.addEventListener("click", pagPricinpal);

console.log(pagPricinpal);

//creación de tabla

const generarTabla = () => {
  operaciones.innerHTML = "";
  console.log(evaluarLocalStorage());
  if (evaluarLocalStorage()) {
    console.log("hola");
    for (let operacion of evaluarLocalStorage()) {
     
      operaciones.innerHTML += `
        <span>${operacion.descripcion}</span>
        <span>${operacion.categoria}</span>
        <span>${operacion.fecha}</span>
        <span>${operacion.monto}</span>
        <div>
          <button class="w-9 h-9 btnEditarOp" data-id="${operacion.id}"><img src="icon-edit.svg" alt=""></button>
        </div>
        </div>  
          <button class="w-9 h-9 btnEliminarOp" data-id="${operacion.id}"><img src="icon-delete.svg" alt=""></button>
        </div>`;
    }
  }
};


// Eliminar operación
const eliminarOperacion = (id) => {
  const operacion = datos.find((operacion) => operacion.id === id);
  if (operacion) {
    const indice = datos.findIndex((operacion) => operacion.id === id);
    if (indice !== -1) {
      // Restablecer los totales según el tipo de operación eliminada
      if (operacion.tipo === "ingreso") {
        ingresos.innerText = parseFloat(ingresos.textContent) - parseFloat(operacion.monto);
      } else if (operacion.tipo === "gasto") {
        gastos.innerText = parseFloat(gastos.textContent) - parseFloat(operacion.monto);
      }
      totalBalances.innerText = parseFloat(ingresos.textContent) - parseFloat(gastos.textContent);
      
      // Eliminar la operación del array y del almacenamiento local
      datos.splice(indice, 1);
      localStorage.setItem("operaciones", JSON.stringify(datos));
      
      // Regenerar la tabla
      generarTabla();
      console.log("Operación eliminada correctamente");
    } else {
      console.log("No se encontró la operación a eliminar");
    }
  } else {
    console.log("No se encontró la operación con el ID proporcionado");
  }
};

// Editar operación
const editarOperacion = (id) => {
  const operacion = datos.find((operacion) => operacion.id === id);
  if (operacion) {
    const formEditar = document.getElementById("formEditarOperacion");
    containerEditarOp.classList.remove("hidden");
    contenedorBalances.classList.add("hidden");
    containerOperaciones.classList.add("hidden");

    const montoAnterior = operacion.monto;

    document.getElementById("editarDescripcion").value = operacion.descripcion;
    document.getElementById("editarMonto").value = operacion.monto;
    document.getElementById("editarTipo").value = operacion.tipo;
    document.getElementById("editarCategoria").value = operacion.categoria;
    document.getElementById("editarFecha").value = operacion.fecha;

    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();

      operacion.descripcion =
        document.getElementById("editarDescripcion").value;
      operacion.monto = document.getElementById("editarMonto").value;
      operacion.tipo = document.getElementById("editarTipo").value;
      operacion.categoria = document.getElementById("editarCategoria").value;
      operacion.fecha = document.getElementById("editarFecha").value;

      const diferenciaMonto =
        parseFloat(operacion.monto) - parseFloat(montoAnterior);

      balancesOperaciones(operacion.tipo, diferenciaMonto);

      localStorage.setItem("operaciones", JSON.stringify(datos));

      generarTabla();

      containerEditarOp.classList.add("hidden");
      contenedorBalances.classList.remove("hidden");
      containerOperaciones.classList.remove("hidden");
    });
  } else console.log("No se encontró la operación con el ID proporcionado");
};
operaciones.addEventListener("click", (e) => {
  const btnEditar = e.target.closest(".btnEditarOp");
  const btnEliminar = e.target.closest(".btnEliminarOp");

  if (btnEditar) {
    const idEdit = btnEditar.getAttribute("data-id");
    editarOperacion(idEdit);
  } else if (btnEliminar) {
    const idDelete = btnEliminar.getAttribute("data-id");
    eliminarOperacion(idDelete);
  }
});
generarTabla();
