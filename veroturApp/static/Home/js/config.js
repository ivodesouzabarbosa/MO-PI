document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown-menu'); // Certifique-se que o seletor está correto
    dropdown.classList.toggle('active');
});