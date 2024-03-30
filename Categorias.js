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
    categorias.forEach((categoria) => agregarCategoria(categoria)); // Llama a agregarCategoria
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
      "categoria-" + (categoriasContainer.children.length + 1);

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

    // Agregar funcionalidad a los botones de editar y eliminar de la nueva categoría
    const editarCategoriaBtn = nuevaCategoria.querySelector(
      ".editar-categoria-btn"
    );
    const eliminarCategoriaBtn = nuevaCategoria.querySelector(
      ".eliminar-categoria-btn"
    );

    editarCategoriaBtn.addEventListener("click", function () {
      // Lógica para editar la categoría
      const categoriaId = this.getAttribute("data-categoria-id");
      // Implementa la lógica para editar la categoría según sea necesario
      console.log("Editar categoría con ID:", categoriaId);
    });

    eliminarCategoriaBtn.addEventListener("click", function () {
      // Lógica para eliminar la categoría
      const categoriaId = this.getAttribute("data-categoria");
      const categoria = document.getElementById(categoriaId);
      if (categoria) {
        categoria.remove();
        console.log("Categoría eliminada con éxito:", categoriaId);
      } else {
        console.log("No se encontró la categoría a eliminar:", categoriaId);
      }
    });
  }
});

//BOTON ELIMINAR CATEGORIA

const eliminarCategoriaBtns = document.querySelectorAll(
  ".eliminar-categoria-btn"
);

eliminarCategoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const categoriaId = btn.getAttribute("data-categoria");

    const categoriaAEliminar = document.getElementById(categoriaId);

    // Confirmar si el usuario realmente quiere eliminar la categoría
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar la categoría "${categoriaAEliminar.textContent}"?`
      )
    ) {
      // Eliminar la categoría del DOM
      categoriaAEliminar.remove();
    }
  });
});

//EDITAR

const editarCategoriaBtns = document.querySelectorAll(".editar-categoria-btn");

editarCategoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const categoria = btn.getAttribute("data-categoria");
    const editarCategoriaDiv = document.getElementById(
      `editarCategoriaDiv-${categoria}`
    );
    const categoriasDiv = document.getElementById("box2");

    // Ocultar el div de categorías
    categoriasDiv.style.display = "none";

    // Mostrar el div de edición de categoría
    editarCategoriaDiv.style.display = "block";
  });
});

// Obtener todos los botones del menú
const menuBtns = document.querySelectorAll(".opcion");

menuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetDivId = btn.getAttribute("data-target");

    // Ocultar todos los divs excepto el div principal
    document.querySelectorAll("[data-box]").forEach((div) => {
      if (div.id === targetDivId) {
        div.style.display = "block"; // Mostrar el div
      } else {
        div.style.display = "none"; // Ocultar otros divs
      }
    });
  });
});

//reflejo del editado en categorias

document.addEventListener("DOMContentLoaded", function () {
  // Evento de clic para los botones de editar categoría
  const editarCategoriaBtns = document.querySelectorAll(
    ".editar-categoria-btn"
  );
  editarCategoriaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
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

  // Evento de clic para el botón de guardar en el formulario de edición
  const btnGuardarCategoria = document.getElementById("inputEditarCategoria");
  btnGuardarCategoria.addEventListener("click", () => {
    const inputEditarCategoria = document.getElementById(
      "editarCategoriaInput"
    );
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
    }
  });

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

// CANCELAR

const cancelarCategoriaBtn = document.getElementById(
  "cancelar-categoria-boton"
);

cancelarCategoriaBtn.addEventListener("click", () => {
  // Ocultar el div de edición de categoría
  document.querySelectorAll('[id^="editarCategoriaDiv"]').forEach((div) => {
    div.style.display = "none";
  });

  // Mostrar el div de categorías
  document.getElementById("box2").style.display = "block";
});
