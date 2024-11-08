function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.458563, lng: -48.490239 },
        zoom: 2,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
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
    const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
    directionsRenderer.setMap(map);

    let userMarker;
    let watchID;

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
            radius += 1;
            if (radius > 100) {
                radius = 0;
            }
            requestAnimationFrame(animateRadar);
        }
        animateRadar();
    }

    function getCurrentLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    callback(userLat, userLng);

                    if (!userMarker) {
                        userMarker = new google.maps.Marker({
                            position: { lat: userLat, lng: userLng },
                            map: map,
                            title: 'Você está aqui',
                        });
                        createRadarEffect(map, { lat: userLat, lng: userLng });
                    } else {
                        userMarker.setPosition({ lat: userLat, lng: userLng });
                    }
                    map.setCenter({ lat: userLat, lng: userLng });
                    map.setZoom(15);
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

    getCurrentLocation((userLat, userLng) => {
        map.setCenter({ lat: userLat, lng: userLng });
        map.setZoom(15);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const destinationLat = parseFloat(urlParams.get('lat'));
    const destinationLng = parseFloat(urlParams.get('lng'));

    if (destinationLat && destinationLng) {
        // Cria a rota inicial
        getCurrentLocation((userLat, userLng) => {
            const request = {
                origin: { lat: userLat, lng: userLng },
                destination: { lat: destinationLat, lng: destinationLng },
                travelMode: 'DRIVING'
            };

            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                    map.setCenter(result.routes[0].legs[0].end_location);
                } else {
                    console.error('Erro ao traçar rota:', status);
                }
            });

            // Inicia o rastreamento contínuo da posição do usuário
            watchID = navigator.geolocation.watchPosition(
                position => {
                    const updatedLat = position.coords.latitude;
                    const updatedLng = position.coords.longitude;

                    // Atualiza a posição do marcador do usuário
                    if (!userMarker) {
                        // Cria o marcador se não existir ainda
                        userMarker = new google.maps.Marker({
                            position: { lat: updatedLat, lng: updatedLng },
                            map: map,
                            title: 'Você está aqui',
                        });

                        // Opcional: centra o mapa na nova posição do usuário
                        map.setCenter({ lat: updatedLat, lng: updatedLng });

                        // Cria o efeito de radar ao redor do marcador do usuário
                        createRadarEffect(map, { lat: updatedLat, lng: updatedLng });
                    } else {
                        // Atualiza a posição do marcador e do radar
                        userMarker.setPosition({ lat: updatedLat, lng: updatedLng });
                    }

                    // Atualiza a rota em tempo real
                    updateRoute(userLat, userLng, destinationLat, destinationLng);

                    // Centraliza o mapa na nova posição do usuário
                    map.setCenter({ lat: updatedLat, lng: updatedLng });
                },
                error => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );
        });
    }

    function updateRoute(userLat, userLng, destinationLat, destinationLng) {
        const request = {
            origin: { lat: userLat, lng: userLng },
            destination: { lat: destinationLat, lng: destinationLng },
            travelMode: 'DRIVING'
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
                map.setCenter(result.routes[0].legs[0].end_location);
            } else {
                console.error('Erro ao traçar rota:', status);
            }
        });
    }

    document.querySelectorAll('.route-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o redirecionamento do link

            // Obtém as coordenadas do destino
            const destinationLat = parseFloat(this.getAttribute('data-lat'));
            const destinationLng = parseFloat(this.getAttribute('data-lng'));

            // Obtém a localização atual do usuário e traça a rota
            getCurrentLocation((userLat, userLng) => {
                const request = {
                    origin: { lat: userLat, lng: userLng },
                    destination: { lat: destinationLat, lng: destinationLng },
                    travelMode: 'DRIVING'
                };

                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                        map.setCenter(result.routes[0].legs[0].end_location);
                    } else {
                        console.error('Erro ao traçar rota:', status);
                    }
                });
            });
        });
    });


    // // Define um ícone padrão para todos os marcadores
    // const markerIcon = {
    //     url: "https://fonts.gstatic.com/s/i/materialicons/place/v6/24px.svg", // Ícone de localização padrão
    //     scaledSize: new google.maps.Size(30, 40),
    //     anchor: new google.maps.Point(15, 40)
    // };

    const categoriaCores = {
        "Museus": "#ff6347",         // vermelho-tomate
        "Parques": "#32cd32",        // verde-lima
        "Praças": "#4169e1",         // azul-royal
        "Ilhas": "#ff8c00",          // laranja
        "Atrações": "#ff1493",       // rosa profundo
        "Shoppings": "#4682b4",      // azul-acinzentado
        "Restaurantes": "#6a5acd",   // azul ardósia
        "Igrejas": "#8b4513",        // marrom
        "Prédios Históricos": "#daa520" // dourado
    };

    function gerarIconeCor(categoria) {
        const cor = categoriaCores[categoria] || "#333"; // Cor padrão se a categoria não for encontrada
        const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="${cor}">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>`;
        return "data:image/svg+xml;base64," + btoa(svgIcon);
    }
    
    

    fetch('/pontos-turisticos/')
    .then(response => response.json())
    .then(data => {
        const addedMarkers = new Set();

        data.forEach(ponto => {
            const latitude = parseFloat(ponto.latitude);
            const longitude = parseFloat(ponto.longitude);

            // Obtenha a categoria do ponto turístico
            const categoria = ponto["categorias_id_categorias__nome"];

            if (!latitude || !longitude) {
                console.warn(`Coordenadas inválidas para o ponto: ${ponto.nome}`);
                return;
            }

            const latLngKey = `${latitude},${longitude}`;

            if (addedMarkers.has(latLngKey)) {
                console.warn(`Marcador já adicionado para as coordenadas: ${latLngKey}`);
                return;
            }

            addedMarkers.add(latLngKey);

            // Gere o ícone colorido para a categoria
            const markerIcon = {
                url: gerarIconeCor(categoria),
                scaledSize: new google.maps.Size(35, 55),
                anchor: new google.maps.Point(15, 40)
            };

            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: ponto.nome,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
            });

            marker.addListener('click', () => {
                const contentString = `
                    <div class="info-window p-3">
                        <h3 class="info-title text-center">${ponto.nome}</h3>
                        <img src="/media/${ponto.imagem}" alt="${ponto.nome}" class="info-image img-fluid mb-2" />
                        <div class="content-ponto">
                        <p><span>Endereço:</span> 
                        ${ponto.endereco || 'Não disponível'}</p>
                        <p><span>Horários de Funcionamento:</span> 
                        ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                        <p><span>Locais Pagos:</span> 
                        ${ponto.lugares_pagos || 'Não disponível'}</p>
                        <p><span>Monitoria:</span> 
                        ${ponto.monitoria || 'Não disponível'}</p>
                        </div>
                        <button id="start-route">Iniciar Rota</button>
                    </div>`;
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);

                google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                    const startRouteButton = document.getElementById('start-route');
                    if (startRouteButton) {
                        startRouteButton.addEventListener('click', () => {
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

                                        infoWindow.close();
                                    } else {
                                        console.error('Erro ao traçar rota:', status);
                                    }
                                });
                            });
                        });
                    }
                }); // script para rota
            });
        });
    })
    .catch(error => console.error('Erro ao buscar pontos turísticos:', error));
}


document.addEventListener("DOMContentLoaded", function() {
    initMap()
})