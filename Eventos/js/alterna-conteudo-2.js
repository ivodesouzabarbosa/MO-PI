// // Seleciona todos os botões de abas
// const tabs = document.querySelectorAll(".tab-btn");

// // Função para manipular o clique na aba
// function tabClicked(tab) {
//     // Remove a classe 'active' de todas as abas
//     tabs.forEach(function(tab) {
//         tab.classList.remove('active');
//     });

//     // Adiciona a classe 'active' na aba clicada
//     tab.classList.add('active');

//     // Seleciona todos os conteúdos
//     const contents = document.querySelectorAll('.content');
//     contents.forEach(function(content) {
//         content.classList.remove('show');
//     });

//     // Obtém o ID do conteúdo a ser mostrado com base na aba clicada
//     const contentId = tab.getAttribute('content-id');
//     const content = document.getElementById(contentId);

//     // Mostra o conteúdo correspontente
//     content.classList.add('show');
// }


// // Adiciona o evento de clique para cada aba
// tabs.forEach(function(tab) {
//     tab.addEventListener('click', function() {
//         tabClicked(tab);
//     });
// });

// // Seleciona a aba ativa inicialmente, caso exista, e ativa-a
// const currentActiveTab = document.querySelector('.tab-btn.active');
// if (currentActiveTab) {
//     tabClicked(currentActiveTab);
// }


// Seleciona todos os cards
const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
    // Dentro de cada card, seleciona os botões de abas e conteúdos
    const tabs = card.querySelectorAll(".tab-btn");
    const contents = card.querySelectorAll('.content');

    // Função para manipular o clique na aba
    function tabClicked(tab) {
        // Remove a classe 'active' de todas as abas dentro do card atual
        tabs.forEach(function(t) {
            t.classList.remove('active');
        });

        // Adiciona a classe 'active' na aba clicada
        tab.classList.add('active');

        // Remove a classe 'show' de todos os conteúdos dentro do card atual
        contents.forEach(function(content) {
            content.classList.remove('show');
        });

        // Obtém o ID do conteúdo a ser mostrado com base na aba clicada
        const contentId = tab.getAttribute('content-id');
        const content = card.querySelector(`#${contentId}`);

        // Mostra o conteúdo correspondente
        if (content) {
            content.classList.add('show');
        }
    }

    // Adiciona o evento de clique para cada aba dentro do card atual
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabClicked(tab);
        });
    });

    // Seleciona a aba ativa inicialmente, caso exista, e ativa-a
    const currentActiveTab = card.querySelector('.tab-btn.active');
    if (currentActiveTab) {
        tabClicked(currentActiveTab);
    }
});
