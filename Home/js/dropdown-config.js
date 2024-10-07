document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    const dropdown = this.nextElementSibling;  // Seleciona o próximo elemento (o dropdown)
    dropdown.classList.toggle('active');
});
