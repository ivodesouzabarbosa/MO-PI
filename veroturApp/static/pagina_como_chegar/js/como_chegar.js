document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault(); // Evita o redirecionamento imediato

      // Remove a classe active de todos os cards antes de aplicar ao clicado
      cards.forEach((c) => c.classList.remove("active-card"));

      // Adiciona a classe ao card clicado
      card.classList.add("active-card");

      // Redireciona após um curto atraso para permitir a animação
      setTimeout(() => {
        window.location.href = card.querySelector("a").href;
      }, 200);
    });
  });
});
