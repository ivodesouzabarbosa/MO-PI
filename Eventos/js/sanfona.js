// document.addEventListener('DOMContentLoaded', function() {
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(card => {
//         const imageContainer = card.querySelector('.image-container');
//         imageContainer.addEventListener('click', function(event) {
//             event.stopPropagation();
            
//             // Fecha todos os outros cards
//             cards.forEach(otherCard => {
//                 if (otherCard !== card) {
//                     otherCard.classList.remove('expanded');
//                     const otherContent = otherCard.querySelector('.card-content');
//                     const otherBtn = otherCard.querySelector('.card-btn');
//                     const otherExpandIcon = otherCard.querySelector('.expand-icon');
//                     otherContent.style.maxHeight = '0';
//                     otherContent.style.opacity = '0';
//                     otherBtn.style.display = 'none';
//                     otherBtn.style.opacity = '0';
//                     if (otherExpandIcon) otherExpandIcon.style.transform = 'rotate(0deg)';
//                 }
//             });

//             // Alterna o card clicado
//             const isExpanded = card.classList.toggle('expanded');
//             const content = card.querySelector('.card-content');
//             const btn = card.querySelector('.card-btn');
//             const expandIcon = card.querySelector('.expand-icon');

//             if (isExpanded) {
//                 content.style.maxHeight = content.scrollHeight + 'px';
//                 content.style.opacity = '1';
//                 btn.style.display = 'block';
//                 setTimeout(() => {
//                     btn.style.opacity = '1';
//                 }, 50);
//                 if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';
//             } else {
//                 content.style.maxHeight = '0';
//                 content.style.opacity = '0';
//                 btn.style.opacity = '0';
//                 setTimeout(() => {
//                     btn.style.display = 'none';
//                 }, 300);
//                 if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
//             }
//         });
//     });
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(card => {
//         const imageContainer = card.querySelector('.image-container');
//         imageContainer.addEventListener('click', function(event) {
//             event.stopPropagation();
            
//             // Fecha todos os outros cards
//             cards.forEach(otherCard => {
//                 if (otherCard !== card) {
//                     otherCard.classList.remove('expanded');
//                     const otherContent = otherCard.querySelector('.card-content');
//                     const otherBtn = otherCard.querySelector('.card-btn');
//                     const otherExpandIcon = otherCard.querySelector('.expand-icon');
//                     otherContent.style.maxHeight = '0';
//                     otherContent.style.opacity = '0';
//                     otherBtn.style.display = 'none';
//                     otherBtn.style.opacity = '0';
//                     if (otherExpandIcon) otherExpandIcon.style.transform = 'rotate(0deg)';
//                 }
//             });

//             // Alterna o card clicado
//             const isExpanded = card.classList.toggle('expanded');
//             const content = card.querySelector('.card-content');
//             const container = content.querySelector('#container');
//             const btn = card.querySelector('.card-btn');
//             const expandIcon = card.querySelector('.expand-icon');

//             if (isExpanded) {
//                 // Define o max-height para a altura total do container
//                 const contentHeight = container.scrollHeight; 
//                 content.style.maxHeight = contentHeight + 'px';
//                 content.style.opacity = '1';
//                 btn.style.display = 'block';
//                 setTimeout(() => {
//                     btn.style.opacity = '1';
//                 }, 50);
//                 if (expandIcon) expandIcon.style.transform = 'rotate(180deg)';
//             } else {
//                 content.style.maxHeight = '0';
//                 content.style.opacity = '0';
//                 btn.style.opacity = '0';
//                 setTimeout(() => {
//                     btn.style.display = 'none';
//                 }, 300);
//                 if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
//             }
//         });
//     });
// });



// document.addEventListener('DOMContentLoaded', function() {
//     const cards = document.querySelectorAll('.card');
    
//     cards.forEach(card => {
//         const imageContainer = card.querySelector('.image-container');
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
//             } else {
//                 // Reseta a rotação do ícone quando o card é fechado
//                 if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
//             }
//         });
//     });
// });



document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const imageContainer = card.querySelector('.image-container');
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

                // Chama a função para resetar a aba ativa para "Descrição" quando o card é fechado
                resetTabToDescription(card);
            } else {
                // Reseta a rotação do ícone quando o card é fechado
                if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';

                // // Chama a função para resetar a aba ativa para "Descrição" quando o card é fechado
                // resetTabToDescription(card);
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
