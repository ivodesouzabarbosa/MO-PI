    let instalar;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Evita o prompt automático
        e.preventDefault();
        instalar = e;

        // Exibe o botão para instalar o PWA
        const installButton = document.getElementById('installButton');
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            // Exibe o prompt
            instalar.prompt();
            instalar.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou instalar o PWA');
                } else {
                    console.log('Usuário recusou instalar o PWA');
                }
                instalar = null;
            });
        });
    });

