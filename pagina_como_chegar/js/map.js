// Defina os pontos turísticos em Belém
const pontosTuristicos = [
    { lat: -1.458563, lng: -48.490239, title: 'Ver-o-Peso' },
    { lat: -1.456012, lng: -48.490862, title: 'Basílica de Nossa Senhora de Nazaré' },
    { lat: -1.452057, lng: -48.489873, title: 'Estação das Docas' },
    { lat: -1.458511, lng: -48.485237, title: 'Museu Paraense Emílio Goeldi' },
    { lat: -1.457908, lng: -48.491220, title: 'Teatro da Paz' }
];

function initMap() {
    // Crie o mapa e defina a localização inicial
    const map = new google.maps.Map(document.getElementById("map"), {
        center: pontosTuristicos[0], // Centralize no primeiro ponto
        zoom: 14
    });

    // Adicione marcadores para cada ponto turístico
    pontosTuristicos.forEach(ponto => {
        new google.maps.Marker({
            position: ponto,
            map: map,
            title: ponto.title
        });
    });
}
