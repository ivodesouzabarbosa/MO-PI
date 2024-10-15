function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Localização padrão
        zoom: 14,
        disableDefaultUI: true, // Remove todos os controles padrão
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy", // Permite o uso do mouse sem precisar pressionar "Ctrl"
        styles: [ // Estilo do mapa usando uma paleta minimalista
            {
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }] // Cor clara de fundo
            },
            {
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#333' }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#ffffff' }]
            },
            {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [{ color: '#e0e0e0' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#07da63' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#949192' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#279ca9' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ visibility: 'off' }] // Remove detalhes de trânsito
            }
        ]
    });

    let markers = [];

    const infoWindow = new google.maps.InfoWindow();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true // Remove os marcadores de ponto A e B
    });
    directionsRenderer.setMap(map);

    // Função para obter a localização atual do usuário
    function getCurrentLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    callback(userLat, userLng);

                    // Adiciona um marcador para a localização atual do usuário
                    const userMarker = new google.maps.Marker({
                        position: { lat: userLat, lng: userLng },
                        map: map,
                        title: 'Você está aqui',
                        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    });

                    // Centraliza o mapa na localização atual
                    map.setCenter({ lat: userLat, lng: userLng });
                    map.setZoom(15); // Defina um nível de zoom adequado para o detalhe da localização
                },
                error => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            console.log("Geolocalização não é suportada pelo navegador.");
        }
    }

    // Busque os pontos turísticos do backend dentro dos limites atuais
    function fetchPontosTuristicos(bounds) {
        const ne = bounds.getNorthEast(); // Coordenadas do canto superior direito
        const sw = bounds.getSouthWest(); // Coordenadas do canto inferior esquerdo

        fetch(`/pontos-turisticos/?neLat=${ne.lat()}&neLng=${ne.lng()}&swLat=${sw.lat()}&swLng=${sw.lng()}`)
        .then(response => response.json())
        .then(data => {
            // Remove todos os marcadores anteriores
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            // Adicionar novos marcadores para os pontos dentro dos limites
            data.forEach(ponto => {
                const latitude = parseFloat(ponto.latitude);
                const longitude = parseFloat(ponto.longitude);

                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: ponto.nome,
                    animation: google.maps.Animation.DROP
                });

                markers.push(marker);

                marker.addListener('click', () => {
                    const contentString = `
                        <div class="info-window p-3">
                            <h3 class="info-title text-center">${ponto.nome}</h3>
                            <img src="media/${ponto.imagem}" alt="${ponto.nome}" class="info-image img-fluid mb-2" />
                            <p>${ponto.descricao || 'Sem descrição'}</p>
                            <p><strong>Endereço:</strong> ${ponto.endereco || 'Não disponível'}</p>
                            <p><strong>Horários de Funcionamento:</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                            <p><strong>Locais Pagos:</strong> ${ponto.lugares_pagos || 'Não disponível'}</p>
                            <p><strong>Monitoria:</strong> ${ponto.monitoria || 'Não disponível'}</p>
                            <button id="start-route" class="btn btn-primary btn-block">Iniciar Rota</button>
                        </div>
                    `;

                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);

                    // Adicionar evento de clique ao botão
                    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                        document.getElementById('start-route').addEventListener('click', () => {
                            getCurrentLocation((userLat, userLng) => {
                                const request = {
                                    origin: { lat: userLat, lng: userLng },
                                    destination: { lat: latitude, lng: longitude },
                                    travelMode: 'DRIVING'
                                };
                                directionsService.route(request, (result, status) => {
                                    if (status === 'OK') {
                                        directionsRenderer.setDirections(result);
                                        map.setCenter(result.routes[0].legs[0].end_location);
                                    }
                                });
                            });
                        });
                    });
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os pontos turísticos:', error));
    }

    // Atualizar os pontos turísticos com base nos limites do mapa ao alterar o zoom ou arrastar o mapa
    google.maps.event.addListener(map, 'bounds_changed', function() {
        const bounds = map.getBounds();
        fetchPontosTuristicos(bounds);
    });

    // Obtenha e mostre a localização atual do usuário ao iniciar o mapa
    getCurrentLocation(() => {});
}
