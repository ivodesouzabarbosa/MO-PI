function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Localização padrão
        zoom: 14,
        disableDefaultUI: true, // Remove todos os controles padrão
    });

    const infoWindow = new google.maps.InfoWindow();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true // Remove os marcadores de ponto A e B
    });
    directionsRenderer.setMap(map);

    // Função para obter detalhes adicionais do local pela Google Places API
    function getPlaceDetails(placeId, callback) {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: placeId,
            fields: ['opening_hours', 'formatted_address']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                callback(place);
            } else {
                console.error('Erro ao buscar detalhes do local:', status);
            }
        });
    }

    // Busque os pontos turísticos do backend
    fetch('/pontos-turisticos/')
    .then(response => response.json())
    .then(data => {
        data.forEach(ponto => {
            const latitude = parseFloat(ponto.latitude);
            const longitude = parseFloat(ponto.longitude);
            const placeId = ponto.place_id;

            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: ponto.nome,
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                animation: google.maps.Animation.DROP
            });

            marker.addListener('click', () => {
                if (placeId) {
                    getPlaceDetails(placeId, (place) => {
                        const openingHours = place.opening_hours ? place.opening_hours.weekday_text.join('<br>') : 'Não disponível';
                        const isOpenNow = place.opening_hours && place.opening_hours.isOpen() ? 'Aberto agora' : 'Fechado no momento';

                        const contentString = `
                            <div class="info-window">
                                <h3 class="info-title">${ponto.nome}</h3>
                                <img src="${ponto.imagem}" alt="${ponto.nome}" class="info-image" />
                                <p>${ponto.descricao || 'Sem descrição'}</p>
                                <p><strong>Endereço (Banco):</strong> ${ponto.endereco || 'Não disponível'}</p>
                                <p><strong>Endereço (Google):</strong> ${place.formatted_address || 'Não disponível'}</p>
                                <p><strong>Horários de Funcionamento:</strong><br> ${openingHours}</p>
                                <p><strong>Status:</strong> ${isOpenNow}</p>
                                <p><strong>Horários (Banco):</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                                <button id="start-route" class="btn-route">Iniciar Rota</button>
                            </div>
                        `;

                        infoWindow.setContent(contentString);
                        infoWindow.open(map, marker);
                    });
                } else {
                    const contentString = `
                        <div class="info-window">
                            <h3 class="info-title">${ponto.nome}</h3>
                            <img src="${ponto.imagem}" alt="${ponto.nome}" class="info-image" />
                            <p>${ponto.descricao || 'Sem descrição'}</p>
                            <p><strong>Endereço:</strong> ${ponto.endereco || 'Não disponível'}</p>
                            <p><strong>Horários (Banco):</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                            <button id="start-route" class="btn-route">Iniciar Rota</button>
                        </div>
                    `;

                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                }
            });
        });
    })
    .catch(error => console.error('Erro ao carregar os pontos turísticos:', error));
}
