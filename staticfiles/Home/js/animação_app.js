document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById('splash-screen');

    // Verifica se o splash foi exibido anteriormente
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');

    // Se nunca foi visto antes, exibe o splash
    if (!hasSeenSplash) {
        splashScreen.style.display = 'block'; // Mostre o vídeo
        localStorage.setItem('hasSeenSplash', 'true'); // Marque que o splash foi visto
    } else {
        splashScreen.style.display = 'none'; // Oculte o vídeo se já foi visto
    }

    // Adiciona um evento para ocultar a tela splash após 5 segundos (ou o que preferir)
    setTimeout(() => {
        splashScreen.style.display = 'none'; // Oculte a tela splash após 5 segundos
    }, 1000); // Tempo em milissegundos
});
