function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 }, // Localização padrão
        zoom: 2,
        disableDefaultUI: true, // Remove todos os controles padrão
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
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
            }
        ]
    });

    const infoWindow = new google.maps.InfoWindow();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true // Remove os marcadores de ponto A e B
    });
    directionsRenderer.setMap(map);

    // Função para criar o efeito de radar
    function createRadarEffect(map, position) {
        let radius = 0;
        let radarCircle = new google.maps.Circle({
            strokeColor: "#00BFFF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00BFFF",
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 0
        });
        function animateRadar() {
            radarCircle.setRadius(radius);
            radius += 1; // Aumenta o raio do radar
            if (radius > 100) { // Se o raio passar de 100 metros, reinicia
                radius = 0;
            }
            requestAnimationFrame(animateRadar); // Anima o radar continuamente
        }
        animateRadar();
    }

    // Função para obter a localização atual do usuário e adicionar um marcador
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

                    // Cria o efeito de radar ao redor da localização do usuário
                    createRadarEffect(map, { lat: userLat, lng: userLng });

                    // Centraliza o mapa na localização atual
                    map.setCenter({ lat: userLat, lng: userLng });
                    map.setZoom(15); // Defina um nível de zoom adequado para o detalhe da localização
                },
                error => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,  // Solicita alta precisão
                    timeout: 10000,            // Tempo limite de 10 segundos
                    maximumAge: 0              // Impede uso de localização em cache
                }
            );
        } else {
            console.log("Geolocalização não é suportada pelo navegador.");
        }
    }

    document.querySelectorAll('.route-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const destinationLat = parseFloat(this.getAttribute('data-lat'));
            const destinationLng = parseFloat(this.getAttribute('data-lng'));

            getCurrentLocation((userLat, userLng) => {
                const request = {
                    origin: { lat: userLat, lng: userLng },
                    destination: { lat: destinationLat, lng: destinationLng },
                    travelMode: 'DRIVING'
                };
                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                        map.setCenter(result.routes[0].legs[0].start_location);
                    } else {
                        console.error('Erro ao traçar rota:', status);
                    }
                });
            });
        });
    });

    // Busque os pontos turísticos do backend
    fetch('/pontos-turisticos/')
    .then(response => response.json())
    .then(data => {
        const addedMarkers = new Set(); // Set para rastrear coordenadas já usadas

        data.forEach(ponto => {
            const latitude = parseFloat(ponto.latitude);
            const longitude = parseFloat(ponto.longitude);

            // Validação para coordenadas corretas
            if (!latitude || !longitude) {
                console.warn(`Coordenadas inválidas para o ponto: ${ponto.nome}`);
                return; // Pula esse ponto
            }

            const latLngKey = `${latitude},${longitude}`;

            // Verifica se já há marcador para essa posição
            if (addedMarkers.has(latLngKey)) {
                console.warn(`Marcador já adicionado para as coordenadas: ${latLngKey}`);
                return;
            }

            addedMarkers.add(latLngKey);

            const markerIcon = {
                url: `/media/${ponto.imagem}`, // URL da imagem do pino (que você criou)
                scaledSize: new google.maps.Size(30, 40), // Ajuste o tamanho do ícone conforme necessário
                anchor: new google.maps.Point(15, 40) // Ajuste o ponto de ancoragem para centralizar a imagem no pino
            };


            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: ponto.nome,
                animation: google.maps.Animation.DROP,
                icon: markerIcon // Definindo o ícone personalizado
            });

            marker.addListener('click', () => {
                const contentString = `
                    <div class="info-window p-3">
                        <h3 class="info-title text-center">${ponto.nome}</h3>
                        <img src="/media/${ponto.imagem}" alt="${ponto.nome}" class="info-image img-fluid mb-2" />
                        <div class="content-descricao">
                        <p>${ponto.descricao || 'Sem descrição'}</p>
                        </div>
                        <p><strong>Endereço:</strong> ${ponto.endereco || 'Não disponível'}</p>
                        <p><strong>Horários de Funcionamento:</strong> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                        <p><strong>Locais Pagos:</strong> ${ponto.lugares_pagos || 'Não disponível'}</p>
                        <p><strong>Monitoria:</strong> ${ponto.monitoria || 'Não disponível'}</p>
                        <button id="start-route">Iniciar Rota</button>
                    </div>
                `;

                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);

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

    // Obtenha e mostre a localização atual do usuário ao iniciar o mapa
    getCurrentLocation(() => { });
}
 