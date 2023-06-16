var backButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    backButton.classList.add("show"); // Adiciona a classe 'show' para exibir o botão
  } else {
    backButton.classList.remove("show"); // Remove a classe 'show' para ocultar o botão
  }
});

function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
