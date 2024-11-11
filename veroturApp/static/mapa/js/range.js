// Simulação de pontos turísticos com coordenadas (latitude, longitude)
const pontosTuristicos = [
    { nome: "Ponto A", lat: -23.550520, lng: -46.633308 }, // São Paulo
    { nome: "Ponto B", lat: -22.906847, lng: -43.172896 }, // Rio de Janeiro
    { nome: "Ponto C", lat: -30.027716, lng: -51.228716 }, // Porto Alegre
    { nome: "Ponto D", lat: -19.8157, lng: -43.9542 },     // Belo Horizonte
    // Adicione mais pontos turísticos conforme necessário
];

// Distâncias correspondentes aos valores do range (0-3)
const distancias = [0, 5, 10, 15]; // 0 km, 5 km, 10 km, 15 km

// Função para calcular a distância entre dois pontos usando a fórmula Haversine (em metros)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Raio da Terra em metros
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Retorna a distância em metros
}

// Função para filtrar os pontos turísticos de acordo com a distância selecionada
function filtrarPontosTuristicos(distanciaMaxima) {
    // Obter a localização atual do usuário ou uma localização fixa (exemplo: São Paulo)
    const latAtual = -23.550520; // Exemplo de latitude de São Paulo
    const lngAtual = -46.633308; // Exemplo de longitude de São Paulo

    // Iterar sobre todos os pontos turísticos
    pontosTuristicos.forEach((ponto, index) => {
        const distancia = calcularDistancia(latAtual, lngAtual, ponto.lat, ponto.lng);
        const pontoElemento = document.getElementById(`ponto-${index}`);

        // Garantir que o ponto existe antes de modificar
        if (pontoElemento) {
            if (distancia <= distanciaMaxima * 1000) { // Comparar em metros
                pontoElemento.style.display = 'block'; // Mostra o ponto
            } else {
                pontoElemento.style.display = 'none'; // Oculta o ponto
            }
        }
    });
}

// Função para exibir os pontos turísticos no HTML
function exibirPontos(pontos) {
    const container = document.getElementById("pontos-turisticos");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    // Criar um elemento div para cada ponto turístico e atribuir um id único
    pontos.forEach((ponto, index) => {
        const div = document.createElement("div");
        div.id = `ponto-${index}`; // Adiciona um id único para cada ponto
        div.textContent = ponto.nome;
        container.appendChild(div);
    });
}

// Função que atualiza a distância com base no valor do slider
function updateDistanceValue(value) {
    const distanciaSelecionada = distancias[value]; // Mapeia o valor do slider para a distância
    filtrarPontosTuristicos(distanciaSelecionada);

    // Exibir a distância selecionada (opcional, se quiser mostrar no UI)
    console.log(`Distância selecionada: ${distanciaSelecionada} km`);
}

// Inicializa a exibição de todos os pontos turísticos
exibirPontos(pontosTuristicos);

// Inicializa com a distância 0 km (nenhum ponto será mostrado)
updateDistanceValue(0);