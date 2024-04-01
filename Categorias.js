//agregar y guardar en almacenam

document.addEventListener("DOMContentLoaded", function () {
  const categoriasContainer = document.getElementById("categ");

  // Función para guardar las categorías en localStorage
  function guardarCategoriasEnLocalStorage() {
    const categorias = Array.from(
      categoriasContainer.querySelectorAll(".categoria")
    ).map((categoria) => categoria.querySelector("h3").textContent);
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }

  // Función para cargar las categorías desde localStorage
  function cargarCategoriasDesdeLocalStorage() {
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    limpiarCategoriasContainer(); // Limpiar el contenedor antes de cargar categorías
    categorias.forEach((categoria) => agregarCategoria(categoria)); // Llama a agregarCategoria
    agregarEventListeners(); // Agrega event listeners después de cargar categorías
  }

  // Limpiar el contenedor de categorías
  function limpiarCategoriasContainer() {
    categoriasContainer.innerHTML = "";
  }

  // Cargar las categorías almacenadas en localStorage al cargar la página
  cargarCategoriasDesdeLocalStorage();

  // Agregar categoría
  const agregarCategoriaBoton = document.getElementById(
    "agregar-categoria-boton"
  );
  const nuevaCategoriaInput = document.getElementById("nueva-categoria-input");

  agregarCategoriaBoton.addEventListener("click", function () {
    const nombreCategoria = nuevaCategoriaInput.value.trim();

    if (nombreCategoria !== "") {
      agregarCategoria(nombreCategoria); // Llama a la función para agregar categoría
      guardarCategoriasEnLocalStorage(); // Guarda las categorías en localStorage
      nuevaCategoriaInput.value = ""; // Limpia el campo de entrada después de agregar
      agregarEventListeners(); // Agrega event listeners después de agregar categoría
    } else {
      alert("Por favor, introduce un nombre válido para la categoría.");
    }
  });

  // Función para agregar una nueva categoría al DOM
  function agregarCategoria(nombreCategoria) {
    // Crear un nuevo elemento de categoría
    const nuevaCategoria = document.createElement("div");
    nuevaCategoria.classList.add("categoria");
    nuevaCategoria.id =
      "categoria-" + (document.querySelectorAll(".categoria").length + 1);

    // Construir el contenido de la categoría
    nuevaCategoria.innerHTML = `
      <div class="flex grid grid-flow-col justify-between">
        <div class="pt-16">
          <h3 class="w-20 text-center bg-fuchsia-200 text-fuchsia-700 rounded-md">
            ${nombreCategoria}
          </h3>
        </div>
        <div class="ml-6 mt-6 text-center text-fuchsia-700">
          <button class="editar-categoria-btn" data-categoria-id="${nuevaCategoria.id}">
            <img class="m-8 h-8" src="icon-edit.svg" alt="" />
          </button>
          <button class="eliminar-categoria-btn" data-categoria="${nuevaCategoria.id}">
            <img class="m-8 h-8" src="icon-delete.svg" alt="" />
          </button>
          <p></p>
        </div>
      </div>
    `;

    // Agregar la nueva categoría al contenedor
    categoriasContainer.appendChild(nuevaCategoria);
  }

  // Función para agregar event listeners a los botones de editar y eliminar
  function agregarEventListeners() {
    const editarCategoriaBtns = document.querySelectorAll(
      ".editar-categoria-btn"
    );
    const eliminarCategoriaBtns = document.querySelectorAll(
      ".eliminar-categoria-btn"
    );

    editarCategoriaBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar la propagación del evento al contenedor principal
        const categoriaId = btn.getAttribute("data-categoria-id");
        const nombreCategoria = document
          .getElementById(categoriaId)
          .querySelector("h3").textContent;
        const inputEditarCategoria = document.getElementById(
          "editarCategoriaInput"
        );
        const editarCategoriaDiv = document.getElementById(
          "editarCategoriaDiv-Categoria"
        );

        // Mostrar el nombre de la categoría en el formulario de edición
        inputEditarCategoria.value = nombreCategoria;
        inputEditarCategoria.dataset.categoriaId = categoriaId;

        // Ocultar el div de categorías y mostrar el formulario de edición
        document.getElementById("box2").style.display = "none";
        editarCategoriaDiv.style.display = "block";
      });
    });

    eliminarCategoriaBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar la propagación del evento al contenedor principal
        const categoriaId = btn.getAttribute("data-categoria");
        const categoriaAEliminar = document.getElementById(categoriaId);
        const confirmarEliminar = confirm(
          `¿Estás seguro de que quieres eliminar la categoría "${
            categoriaAEliminar.querySelector("h3").textContent
          }"?`
        );
        if (confirmarEliminar) {
          categoriaAEliminar.remove();
          guardarCategoriasEnLocalStorage(); // Guarda las categorías actualizadas en localStorage
        }
      });
    });
  }

  // Evento de clic para cancelar la edición y volver al div principal
  const btnCancelarCategoria = document.getElementById(
    "cancelar-categoria-boton"
  );
  btnCancelarCategoria.addEventListener("click", () => {
    // Ocultar el formulario de edición y mostrar el div principal
    document.getElementById("box2").style.display = "block";
    document.getElementById("editarCategoriaDiv-Categoria").style.display =
      "none";
  });
});

// Evento de clic para el botón de guardar en el formulario de edición
const btnGuardarCategoria = document.getElementById("inputEditarCategoria");
btnGuardarCategoria.addEventListener("click", () => {
  const inputEditarCategoria = document.getElementById("editarCategoriaInput");
  const nombreCategoria = inputEditarCategoria.value;
  const categoriaEditada = inputEditarCategoria.dataset.categoriaId;
  const categoriaDiv = document.getElementById(categoriaEditada);
  if (categoriaDiv) {
    // Actualizar el nombre de la categoría en el div principal
    categoriaDiv.querySelector("h3").textContent = nombreCategoria;

    // Ocultar el formulario de edición y mostrar el div principal
    document.getElementById("box2").style.display = "block";
    document.getElementById("editarCategoriaDiv-Categoria").style.display =
      "none";

    // Guardar las categorías editadas en localStorage
    guardarCategoriasEnLocalStorage();
  }

  // Redirigir al usuario de vuelta al div principal de categorías
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
  box1.style.display = "block";
  box2.style.display = "none";
});

// Función para guardar las categorías en localStorage
function guardarCategoriasEnLocalStorage() {
  const categorias = Array.from(
    categoriasContainer.querySelectorAll(".categoria")
  ).map((categoria) => categoria.querySelector("h3").textContent);
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

// Función para cargar las categorías desde localStorage
function cargarCategoriasDesdeLocalStorage() {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  categorias.forEach((categoria) => agregarCategoria(categoria)); // Llama a agregarCategoria
}

// Cargar las categorías almacenadas en localStorage al cargar la página
cargarCategoriasDesdeLocalStorage();
