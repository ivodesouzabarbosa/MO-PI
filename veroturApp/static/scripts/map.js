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
                            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
                            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
}
