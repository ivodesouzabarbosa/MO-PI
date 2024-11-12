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
    const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.setMap(map);

    let userMarker;
    let watchID;
    let currentCategory = null;
    let maxDistance = Infinity;
    const markers = [];

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
            if (radius > 100) radius = 0;
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

                    const customIconSVG = {
                        path: "M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z", // Exemplo de forma SVG (um círculo)
                        fillColor: "#4b72ce",  // Cor do pino
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF", // Cor da borda
                        strokeWeight: 2,
                        scale: 1.5,  // Tamanho do ícone
                        anchor: new google.maps.Point(12, 30),  // Posição do ícone
                    };

                    if (!userMarker) {
                        userMarker = new google.maps.Marker({
                            position: { lat: userLat, lng: userLng },
                            map: map,
                            title: 'Você está aqui',
                            icon: customIconSVG,  // Aqui você aplica o ícone personalizado
                        });
                        createRadarEffect(map, { lat: userLat, lng: userLng });
                    } else {
                        userMarker.setPosition({ lat: userLat, lng: userLng });
                    }
                    map.setCenter({ lat: userLat, lng: userLng });
                    map.setZoom(15);
                },
                error => console.error('Erro ao obter localização:', error),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            console.log("Geolocalização não é suportada pelo navegador.");
        }
    }

    // Obtém os parâmetros da URL e assegura que a latitude e longitude sejam números válidos
    const urlParams = new URLSearchParams(window.location.search);
    let destinationLat = urlParams.get('lat');
    let destinationLng = urlParams.get('lng');

    // Substitui vírgulas por pontos, se houver, antes da conversão para ponto flutuante
    if (destinationLat && destinationLng) {
        destinationLat = parseFloat(destinationLat.replace(',', '.'));
        destinationLng = parseFloat(destinationLng.replace(',', '.'));
    }

    if (!isNaN(destinationLat) && !isNaN(destinationLng)) {
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
                        userMarker = new google.maps.Marker({
                            position: { lat: updatedLat, lng: updatedLng },
                            map: map,
                            title: 'Você está aqui',
                        });
                        map.setCenter({ lat: updatedLat, lng: updatedLng });
                        createRadarEffect(map, { lat: updatedLat, lng: updatedLng });
                    } else {
                        userMarker.setPosition({ lat: updatedLat, lng: updatedLng });
                    }

                    // Atualiza a rota em tempo real
                    updateRoute(updatedLat, updatedLng, destinationLat, destinationLng);
                    map.setCenter({ lat: updatedLat, lng: updatedLng });
                },
                error => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000
                }
            );
        });
    }

    // Use watchPosition to keep track of the user's location continuously
    function startWatchingLocation() {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(
                position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    if (userMarker) {
                        userMarker.setPosition({ lat: userLat, lng: userLng });
                        map.setCenter({ lat: userLat, lng: userLng });
                    }
                },
                error => console.error('Erro ao obter localização:', error),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    }

    getCurrentLocation((userLat, userLng) => {
        map.setCenter({ lat: userLat, lng: userLng });
        map.setZoom(15);
        startWatchingLocation();  // Start tracking the user's location
    });

    function updateDistanceValue(value) {
        const distanceOptions = [0, 5, 10, 15];  // Distance in kilometers
        maxDistance = distanceOptions[value] || Infinity;
        filterMarkers();
    }

    function filterMarkers() {
        markers.forEach(marker => {
            const isInCategory = !currentCategory || marker.category === currentCategory;
            const isWithinDistance = maxDistance >= google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), userMarker.getPosition()) / 1000;
            marker.setVisible(isInCategory && isWithinDistance);
        });
    }

    const categoriaCores = {
        "Museus": "#d9b36c", "Parques": "#5dc088", "Praças": "#b6d871", "Ilhas": "#7eb6d9",
        "Atrações": "#dd7b83", "Shoppings": "#c9665c", "Restaurantes": "#cf8b64",
        "Igrejas": "#bb8e85", "Prédios Históricos": "#6c8091", "Terminais": "#b9804a"
    };

    function gerarIconeCor(categoria) {
        const cor = categoriaCores[categoria] || "#333"; // Cor padrão se a categoria não for encontrada
        const corBorda = "#000"; // Cor da borda
        const larguraBorda = 0.5; // Largura da borda
        const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24">
                <path fill="${cor}" stroke="${corBorda}" stroke-width="${larguraBorda}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>`;
        return "data:image/svg+xml;base64," + btoa(svgIcon);
    }

    fetch('/pontos-turisticos/')
        .then(response => response.json())
        .then(data => {
            data.forEach(ponto => {
                const latitude = parseFloat(ponto.latitude);
                const longitude = parseFloat(ponto.longitude);
                const categoria = ponto["categorias_id_categorias__nome"];
                const latLngKey = `${latitude},${longitude}`;
                const markerIcon = {
                    url: gerarIconeCor(categoria),
                    scaledSize: new google.maps.Size(35, 55),
                    anchor: new google.maps.Point(15, 40)
                };

                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: ponto.nome,
                    category: categoria,
                    icon: markerIcon
                });

                marker.addListener('click', () => {
                    const contentString = `
                    <div class="info-window p-3">
                        <h3 class="info-title text-center">${ponto.nome}</h3>
                        <img src="/media/${ponto.imagem}" alt="${ponto.nome}" class="info-image img-fluid mb-2" />
                        <div class="content-ponto">
                        <p><span>Endereço:</span> ${ponto.endereco || 'Não disponível'}</p>
                        <p><span>Horários de Funcionamento:</span> ${ponto.horarios_funcionamento || 'Não disponível'}</p>
                        <p><span>Locais Pagos:</span> ${ponto.lugares_pagos || 'Não disponível'}</p>
                        <p><span>Monitoria:</span> ${ponto.monitoria || 'Não disponível'}</p>
                        </div>
                        <button id="start-route">Iniciar Rota</button>
                    </div>`;
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);

                    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                        document.getElementById("start-route").addEventListener("click", () => {
                            const destination = new google.maps.LatLng(latitude, longitude);
                            const origin = userMarker.getPosition();
                            directionsService.route({
                                origin: origin,
                                destination: destination,
                                travelMode: google.maps.TravelMode.DRIVING
                            }, (result, status) => {
                                if (status === google.maps.DirectionsStatus.OK) {
                                    directionsRenderer.setDirections(result);
                                    infoWindow.close()
                                } else {
                                    console.error('Falha na rota:', status);
                                }
                            });
                        });
                    });
                });

                markers.push(marker);
            });
        })
        .catch(error => console.error('Erro ao buscar pontos turísticos:', error));

    document.querySelectorAll('.icon-categoria').forEach((icon, index) => {
        icon.addEventListener('click', () => {
            // Remove a classe 'active' de todos os ícones
            document.querySelectorAll('.icon-categoria').forEach(icon => icon.classList.remove('active'));
        
            // Adiciona a classe 'active' ao ícone clicado
            icon.classList.add('active');
            const categories = ["Restaurantes", "Shoppings", "Atrações", "Prédios Históricos", "Praças", "Parques", "Ilhas", "Museus", "Igrejas", "Terminais"];
            currentCategory = categories[index];
            filterMarkers();
        });
    });

    // Ajuste de categoria de filtro
    const categoriaSelect = document.getElementById("categoria-select");
    categoriaSelect.addEventListener("change", (event) => {
        currentCategory = event.target.value;
        filterMarkers();
    });

    // Ajuste de filtro de distância
    const distanceSelect = document.getElementById("distance-select");
    distanceSelect.addEventListener("change", (event) => {
        updateDistanceValue(event.target.value);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initMap();
});
