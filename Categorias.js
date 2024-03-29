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

//Agregar categoria

const agregarCategoriaBtn = document.getElementById("agregar-categoria-boton");
const nuevaCategoriaInput = document.getElementById("nueva-categoria-input");

// Agregar un evento de clic al botón de agregar categoría
agregarCategoriaBtn.addEventListener("click", () => {
  // Obtener el nombre de la nueva categoría del campo de entrada
  const nombreNuevaCategoria = nuevaCategoriaInput.value;

  // Verificar si se proporcionó un nombre de categoría
  if (nombreNuevaCategoria.trim() !== "") {
    // Crear un nuevo contenedor de categoría en el DOM
    const nuevaCategoriaContenedor = document.createElement("div");
    nuevaCategoriaContenedor.classList.add(
      "p-2",
      "bg-fuchsia-200",
      "text-fuchsia-700",
      "rounded-md",
      "w-20",
      "text-center"
    );

    // Crear un nuevo elemento de categoría en el DOM con el nombre proporcionado
    const nuevaCategoriaNombre = document.createElement("span");
    nuevaCategoriaNombre.textContent = nombreNuevaCategoria;

    // Definir el contenido del nuevo elemento de categoría
    nuevaCategoriaContenedor.innerHTML = `
         <div class="flex grid grid-flow-col justify-between">
            <div class="pt-16">
                <h3 class="w-20 text-center bg-fuchsia-200 text-fuchsia-700 rounded-md">
                    ${nombreNuevaCategoria}
                </h3>
            </div>
            <div class="ml-6 mt-6 text-center text-fuchsia-700">
                <button class="editar-categoria-btn" data-categoria="${nombreNuevaCategoria}">
                    <img class="m-8 h-8" src="icon-edit.svg" alt="">
                </button>
                <button>
                    <img class="m-8 h-8" src="icon-delete.svg" alt="">
                </button>
                <p></p>
            </div>
            </div>
        `;

    // Agregar la nueva categoría al contenedor de categorías
    const contenedorCategorias = document.getElementById("categ");
    contenedorCategorias.appendChild(nuevaCategoriaContenedor);

    // Limpiar el campo de entrada después de agregar la categoría
    nuevaCategoriaInput.value = "";
  } else {
    // Si no se proporcionó un nombre de categoría, muestra un mensaje de error
    alert("Por favor ingresa un nombre para la nueva categoría.");
  }
});
