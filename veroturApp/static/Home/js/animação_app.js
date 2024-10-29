document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById('splash-screen');

    // Verifica se a tela é mobile
    if (window.innerWidth <= 768) {
        // Verifica se o splash foi exibido anteriormente
        const hasSeenSplash = localStorage.getItem('hasSeenSplash');

        if (!hasSeenSplash) {
            splashScreen.style.display = 'block'; // Mostre o vídeo em dispositivos móveis
            localStorage.setItem('hasSeenSplash', 'true'); // Marque que o splash foi visto
        } else {
            splashScreen.style.display = 'none'; // Oculte o vídeo se já foi visto
        }
    } else {
        splashScreen.style.display = 'none'; // Oculte o vídeo em desktops
    }

    // Adiciona um evento para ocultar a tela splash após 5 segundos (ou o que preferir)
    setTimeout(() => {
        splashScreen.style.display = 'none'; // Oculte a tela splash após 5 segundos
    }, 1000); // Tempo em milissegundos
});

