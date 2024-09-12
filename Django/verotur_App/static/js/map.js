// Função para inicializar o mapa
function initMap() {
    // Crie o mapa e defina a localização inicial
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Centralize em Belém
        zoom: 14
    });

    // Busque os pontos turísticos do backend
    fetch('/pontos-turisticos/')
        .then(response => response.json())
        .then(data => {
            // Adicione marcadores para cada ponto turístico
            data.forEach(ponto => {
                // Certifique-se de que latitude e longitude são números
                const latitude = parseFloat(ponto.latitude);
                const longitude = parseFloat(ponto.longitude);

                new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: ponto.nome
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os pontos turísticos:', error));
}
