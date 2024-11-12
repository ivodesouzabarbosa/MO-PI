// document.addEventListener('DOMContentLoaded', function() {
//     const cards = document.querySelectorAll('.card');
    
//     cards.forEach(card => {
//         const imageContainer = card.querySelector('.image-btn');
//         imageContainer.addEventListener('click', function(event) {
//             event.stopPropagation();
            
//             // Fecha todos os outros cards
//             cards.forEach(otherCard => {
//                 if (otherCard !== card) {
//                     otherCard.classList.remove('expanded');
//                     const otherExpandIcon = otherCard.querySelector('.expand-icon');
//                     if (otherExpandIcon) otherExpandIcon.style.transform = 'rotate(0deg)';
//                 }
//             });

//             // Alterna o card clicado
//             const isExpanded = card.classList.toggle('expanded');
//             const expandIcon = card.querySelector('.expand-icon');

//             if (isExpanded) {
//                 // Rotaciona o ícone quando o card é expandido
//                 if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';

//                 // Chama a função para resetar a aba ativa para "Descrição" quando o card é fechado
//                 resetTabToDescription(card);
//             } else {
//                 // Reseta a rotação do ícone quando o card é fechado
//                 if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';

//                 // // Chama a função para resetar a aba ativa para "Descrição" quando o card é fechado
//                 // resetTabToDescription(card);
//             }
//         });
//     });

//     // Função para resetar a aba ativa para "Descrição"
//     function resetTabToDescription(card) {
//         const descricaoTab = card.querySelector('.tab-btn[content-id="descricao"]');
//         if (descricaoTab) {
//             descricaoTab.click(); // Simula um clique na aba "Descrição"
//         }
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const imageContainer = card.querySelector('.image-btn');
        imageContainer.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Fecha todos os outros cards
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    const otherExpandIcon = otherCard.querySelector('.expand-icon');
                    if (otherExpandIcon) otherExpandIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Alterna o card clicado
            const isExpanded = card.classList.toggle('expanded');
            const expandIcon = card.querySelector('.expand-icon');

            if (isExpanded) {
                // Rotaciona o ícone quando o card é expandido
                if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';

                // Espera a expansão do conteúdo para rolar até o card
                setTimeout(() => {
                    const cardTop = card.getBoundingClientRect().top + window.scrollY - 20;
                    window.scrollTo({ top: cardTop, behavior: 'smooth' });
                }, 550);

                // Chama a função para resetar a aba ativa para "Descrição" quando o card é fechado
                resetTabToDescription(card);
            } else {
                // Reseta a rotação do ícone quando o card é fechado
                if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Função para resetar a aba ativa para "Descrição"
    function resetTabToDescription(card) {
        const descricaoTab = card.querySelector('.tab-btn[content-id="descricao"]');
        if (descricaoTab) {
            descricaoTab.click(); // Simula um clique na aba "Descrição"
        }
    }
});
