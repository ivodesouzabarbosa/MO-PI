document.querySelectorAll('.dropdown-toggle, .dropdown-toggle-desktop').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.classList.toggle('active');
    });
});
