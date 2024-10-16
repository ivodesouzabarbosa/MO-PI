function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Localização padrão
        zoom: 14,
        disableDefaultUI: true, // Remove todos os controles padrão
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
            { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#333' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
            { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#e0e0e0' }] },
            { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#07da63' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#949192' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#279ca9' }] }
        ]
    });

    const infoWindow = new google.maps.InfoWindow();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.setMap(map);

    let markers = []; // Array para armazenar os marcadores

    // Função para remover marcadores antigos
    function clearMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = []; // Limpa o array de marcadores
    }

    // Função para obter a localização atual do usuário
    function getCurrentLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
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

                map.setCenter({ lat: userLat, lng: userLng });
            });
        }
    }

    // Função debounce para limitar a frequência de chamadas à API
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Função para buscar pontos turísticos baseados nos limites do mapa
    function fetchPontosTuristicos() {
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const northeastLat = ne.lat();
        const northeastLng = ne.lng();
        const southwestLat = sw.lat();
        const southwestLng = sw.lng();

        fetch(`/pontos-turisticos?ne_lat=${northeastLat}&ne_lng=${northeastLng}&sw_lat=${southwestLat}&sw_lng=${southwestLng}`)
            .then(response => response.json())
            .then(data => {
                clearMarkers(); // Remove os marcadores antigos

                data.forEach(ponto => {
                    const latitude = parseFloat(ponto.latitude);
                    const longitude = parseFloat(ponto.longitude);

                    const marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                        title: ponto.nome,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        animation: google.maps.Animation.DROP
                    });

                    marker.addListener('click', () => {
                        const contentString = `
                        <div class="info-window">
                            <h3 class="info-title">${ponto.nome}</h3>
                            <img src="${ponto.imagem}" alt="${ponto.nome}" class="info-image" />
                            <p>${ponto.descricao || 'Sem descrição'}</p>
                            <p><strong>Endereço:</strong> ${ponto.endereco || 'Não disponível'}</p>
                            <p><strong>Horários de Funcionamento:</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                            <p><strong>Locais Pagos:</strong> ${ponto.lugares_pagos || 'Não disponível'}</p>
                            <p><strong>Monitoria:</strong> ${ponto.monitoria ? 'Sim' : 'Não'}</p>
                             <button id="start-route" class="btn-route">Iniciar Rota</button>
                        </div>`;

                        infoWindow.setContent(contentString);
                        infoWindow.open(map, marker);

                        // Adicione o evento de clique ao botão "Iniciar Rota"
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
                                        } else {
                                            console.error('Erro ao calcular a rota:', status);
                                        }
                                    });
                                });
                            });
                        });
                    });

                    markers.push(marker); // Adiciona o marcador no array
                });
            })
            .catch(error => console.error('Erro ao carregar os pontos turísticos:', error));
    }

    // Usa debounce para evitar requisições frequentes
    const debouncedFetch = debounce(fetchPontosTuristicos, 300);

    // Listener para carregar pontos turísticos ao mover o mapa
    map.addListener('bounds_changed', debouncedFetch);

    // Obtenha a localização atual do usuário ao iniciar o mapa
    getCurrentLocation(() => {});
}
