// Seleciona o dropdown e o campo de entrada
const inputField = document.querySelector('.container-barra input');
const dropdown = document.querySelector('.dropdown-sugestoes');

// Mostra o dropdown ao focar no campo de entrada
inputField.addEventListener('focus', () => {
    dropdown.style.display = 'block';
});

// Esconde o dropdown ao rolar a página
window.addEventListener('scroll', () => {
    dropdown.style.display = 'none';
});

// Esconde o dropdown ao clicar fora da barra de pesquisa
document.addEventListener('click', (event) => {
    if (!inputField.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});
