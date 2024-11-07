const cache = {}; // Objeto para armazenar os resultados de pesquisa em cache
let debounceTimeout; // Variável para armazenar o timeout do debounce

document.getElementById('busca').addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(buscarSugestoes, 300); // Aguarda 300ms antes de buscar
});

function buscarSugestoes() {
    const pesquisa = document.getElementById('busca').value;
    const dropdown = document.getElementById('dropdown-sugestoes');
    let historico = JSON.parse(localStorage.getItem('historico_pesquisa')) || [];

    // Limpar a lista de sugestões antes de começar a busca
    dropdown.innerHTML = '';

    if (pesquisa.length > 0) {
        // Verificar se a pesquisa já está em cache
        if (cache[pesquisa]) {
            // Usar cache para resposta rápida
            exibirResultados(cache[pesquisa], historico);
            return;
        }

        // Fazer a requisição ao servidor se o cache não contém a pesquisa
        fetch(`/busca/?pesquisa=${pesquisa}`)
            .then(response => response.json())
            .then(data => {
                cache[pesquisa] = data; // Armazenar no cache
                exibirResultados(data, historico); // Exibir os resultados e o histórico
            })
            .catch(error => console.error('Erro ao buscar sugestões:', error));
    } else {
        // Exibir apenas o histórico quando a barra de pesquisa estiver vazia
        exibirHistorico(historico, dropdown);
    }
}

// Função para exibir resultados e histórico de pesquisa juntos
function exibirResultados(data, historico) {
    const dropdown = document.getElementById('dropdown-sugestoes');
    let conteudo = '<ul>';

    if (data.resultados_pontos.length > 0) {
        data.resultados_pontos.forEach(ponto => {
            conteudo += `<li><a href="categoria/${ponto.categoria_id}/" class="sugestao-link">
            <img src="${ponto.imagem_url}" style="width: 30px; height: 30px; margin-right: 10px; object-fit: cover;" alt="imagem local">
            ${ponto.nome}</a></li>`;
        });
    } else {
        conteudo = '<p>Nenhum ponto turístico encontrado.</p>';
        
        // Mostrar o histórico quando não houver resultados
        if (historico.length > 0) {
            conteudo += '<h4>Histórico de Pesquisa</h4><ul>';
            historico.forEach(item => {
                conteudo += `<li><a href="#" class="sugestao-link historico-link">${item}</a></li>`;
            });
            conteudo += '</ul>';
        }
    }

    conteudo += '</ul>';
    dropdown.innerHTML = conteudo;
    dropdown.style.display = 'block';

    // Adicionar evento de clique nos links do histórico para reutilizar a pesquisa
    document.querySelectorAll('.historico-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('busca').value = e.target.textContent;
            buscarSugestoes(); // Executa busca com o termo clicado no histórico
        });
    });
}

// Função para exibir apenas o histórico de pesquisa
function exibirHistorico(historico, dropdown) {
    let conteudo = '<h4>Histórico de Pesquisa</h4><ul>';
    historico.forEach(item => {
        conteudo += `<li><a href="#" class="sugestao-link historico-link">${item}</a></li>`;
    });
    conteudo += '</ul>';

    dropdown.innerHTML = conteudo;
    dropdown.style.display = 'block';

    // Adicionar evento de clique nos links do histórico
    document.querySelectorAll('.historico-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('busca').value = e.target.textContent;
            buscarSugestoes(); // Executa busca com o termo clicado
        });
    });
}

// Evento para fechar o dropdown ao clicar fora dele
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdown-sugestoes');
    if (!dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Salvar a pesquisa no histórico ao submeter o formulário de pesquisa
document.querySelector('.barra-pesquisa').addEventListener('submit', function(event) {
    event.preventDefault();
    const pesquisa = document.getElementById('busca').value;
    let historico = JSON.parse(localStorage.getItem('historico_pesquisa')) || [];

    // Salvar no histórico se o termo for único
    if (pesquisa && !historico.includes(pesquisa)) {
        historico.unshift(pesquisa); // Adicionar no início do histórico
        if (historico.length > 5) historico.pop(); // Limitar o histórico a 5 itens
        localStorage.setItem('historico_pesquisa', JSON.stringify(historico));
    }

    buscarSugestoes(); // Atualizar sugestões com o termo atual
});
