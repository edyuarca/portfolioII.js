// Obtener todos los botones de editar de categoría
const editarCategoriaBtns = document.querySelectorAll(".editar-categoria-btn");

// Agregar un evento de clic a cada botón de edición de categoría
editarCategoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const categoria = btn.getAttribute("data-categoria");
    const editarCategoriaDiv = document.getElementById(
      `editarCategoriaDiv-${categoria}`
    );
    const categoriasDiv = document.getElementById("box2"); //  div de categorías

    // Ocultar el div de categorías
    categoriasDiv.style.display = "none";

    // Mostrar el div de edición de categoría correspondiente
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

// Botón de cancelar
const cancelarCategoriaBtn = document.getElementById(
  "cancelar-categoria-boton"
);

cancelarCategoriaBtn.addEventListener("click", () => {
  // Ocultar el div de editar de categoría
  document.querySelectorAll('[id^="editarCategoriaDiv"]').forEach((div) => {
    div.style.display = "none";
  });

  // Mostrar el div de categorías
  document.getElementById("box2").style.display = "block";
});
