
    function buscarSugestoes() {
        const pesquisa = document.getElementById('busca').value;
        const dropdown = document.getElementById('dropdown-sugestoes');

        if (pesquisa.length > 0) {
            fetch(`/busca/?pesquisa=${pesquisa}`)
                .then(response => response.json())
                .then(data => {
                    let conteudo = '';

                    if (data.resultados_pontos.length > 0) {
                        conteudo += '<ul>';
                        data.resultados_pontos.forEach(ponto => {
                            conteudo += `<li>${ponto.nome}</li>`;
                        });
                        conteudo += '</ul>';
                    } else {
                        conteudo = '<p>Nenhum ponto turístico encontrado.</p>';
                    }

                    dropdown.innerHTML = conteudo;
                    dropdown.style.display = 'block';
                })
                .catch(error => {
                    console.error('Erro ao buscar sugestões:', error);
                });
        } else {
            dropdown.style.display = 'none';
        }
    }

    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('dropdown-sugestoes');
        if (!dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

