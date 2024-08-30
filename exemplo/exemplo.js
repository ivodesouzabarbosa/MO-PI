// seleciona todos os botões de abas
const tabs = document.querySelectorAll(".tab-btn");

// função para manipular o clique na aba
function tabClicked(tab) {
    // remove a classe 'active' de todas as abas
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    //adicionar a aba 'active' na aba clicada
    tab.classList.add('active');
    
    // seleciona todos os conteudos
    const contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.classList.remove('show');
    });

    // obtém o ID do conteúdo a ser mostrado com base na aba clicada
    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);

    // mostra o conteúdo correspondente
    content.classList.add('show');
}

// adicionar evento para cada aba 
tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        tabClicked(tab);
    });
});

// seleciona aba ativa inicialmente, caso exista, e ativa-a
const currentActiveTab = document.querySelector('.tab-btn.active');
if (currentActiveTab) {
    tabClicked(currentActiveTab);
}