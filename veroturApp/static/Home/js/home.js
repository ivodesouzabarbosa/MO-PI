document.addEventListener("DOMContentLoaded", function() {
    // Animação do splash screen
    gsap.to("#splash-screen", { duration: 3, opacity: 1, onComplete: function() {
        // Esconde o splash screen
        document.getElementById("splash-screen").style.display = "none";
        // Exibe o conteúdo
        const conteudo = document.getElementById("pwa");
        conteudo.style.display = "block";
        // Anima o conteúdo para aparecer
        gsap.from(conteudo, { duration: 1, opacity: 0 });
    }});
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/static/service-worker.js')
    });
  }