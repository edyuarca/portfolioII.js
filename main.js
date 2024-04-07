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
  if (tipo === "gasto") {
    total = total - parseFloat(monto);
    gastos.innerText = parseFloat(gastos.textContent) + parseFloat(monto);
  } else if (tipo === "ingreso") {
    total = total + parseFloat(monto);
    ingresos.innerText = parseFloat(ingresos.textContent) + parseFloat(monto);
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
  console.log(categoria.value);
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
};

btnCancelarOpTabla.addEventListener("click", pagPricinpal);

//creación de tabla , editar y eliminar operación

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
          <button class="w-9 h-9 btnEditarOp" data-id="${operacion.id}"><img src="imagenes/icon-edit.svg" alt=""></button>
        </div>
        </div>  
          <button class="w-9 h-9 btnEliminarOp" data-id="${operacion.id}"><img src="imagenes/icon-delete.svg" alt=""></button>
        </div>`;
    }
  }

  console.log("Tabla generada correctamente");
};

// Eliminar operación
const eliminarOperacion = (id) => {
  const indice = datos.findIndex((operacion) => operacion.id === id);
  if (indice !== -1) {
    datos.splice(indice, 1);
    localStorage.setItem("operaciones", JSON.stringify(datos));
    generarTabla();
    console.log("Operación eliminada correctamente");
  } else {
    console.log("No se encontró la operación a eliminar");
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

    const recalcularIngresos = () => {
      let ingresosTotales = 0;
      for (let operacion of datos) {
        if (operacion.tipo === "ingreso") {
          ingresosTotales += parseFloat(operacion.monto);
        }
      }
      return ingresosTotales;
    };

    const montoAnterior = parseFloat(operacion.monto);
    const tipoAnterior = operacion.tipo;
    const ingresosTotales = recalcularIngresos();

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

      const montoNuevo = parseFloat(operacion.monto);
      let tipoNuevo = operacion.tipo;

      if (tipoAnterior === "ingreso") {
        total = total - parseFloat(montoAnterior); // Restar el monto anterior de los ingresos
        ingresos.innerText =
          parseFloat(ingresos.textContent) - parseFloat(montoAnterior); // Actualizar los ingresos
      } else if (tipoAnterior === "gasto") {
        total = total + parseFloat(montoAnterior); // Restar el monto anterior de los gastos
        gastos.innerText =
          parseFloat(gastos.textContent) - parseFloat(montoAnterior); // Actualizar los gastos
      }

      if (tipoNuevo === "gasto") {
        total = total - parseFloat(montoNuevo); // Sumar el nuevo monto como gasto
        gastos.innerText =
          parseFloat(gastos.textContent) + parseFloat(montoNuevo); // Actualizar los gastos
      } else if (tipoNuevo === "ingreso") {
        total = total + parseFloat(montoNuevo); // Sumar el nuevo monto como ingreso
        ingresos.innerText =
          parseFloat(ingresos.textContent) + parseFloat(montoNuevo); // Actualizar los ingresos
      }

      totalBalances.innerText = total;

      ingresos.innerText = ingresosTotales;

      balancesOperaciones(tipoAnterior, montoAnterior);

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
