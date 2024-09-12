// Função para inicializar o mapa
function initMap() {
    // Crie o mapa e defina a localização inicial
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Centralize em Belém
        zoom: 14
    });

    // Crie uma instância de InfoWindow
    const infoWindow = new google.maps.InfoWindow();

    // Busque os pontos turísticos do backend
    fetch('/pontos-turisticos/')
        .then(response => response.json())
        .then(data => {
            // Adicione marcadores para cada ponto turístico
            data.forEach(ponto => {
                // Certifique-se de que latitude e longitude são números
                const latitude = parseFloat(ponto.latitude);
                const longitude = parseFloat(ponto.longitude);

                // Crie o marcador
                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: ponto.nome
                });

                // Adicione um evento de clique ao marcador
                marker.addListener('click', () => {
                    // Defina o conteúdo da janela de informações
                    const contentString = `
                        <div>
                            <h3>${ponto.nome}</h3>
                            <p>${ponto.descricao || 'Sem descrição'}</p>
                            <p><strong>Endereço:</strong> ${ponto.endereco || 'Não disponível'}</p>
                            <p><strong>Horários de Funcionamento:</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                            <p><strong>Locais Pagos:</strong> ${ponto.lugares_pagos || 'Não disponível'}</p>
                            <p><strong>Monitoria:</strong> ${ponto.monitoria ? 'Sim' : 'Não'}</p>
                        </div>
                    `;

                    // Abra a janela de informações
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os pontos turísticos:', error));
}
