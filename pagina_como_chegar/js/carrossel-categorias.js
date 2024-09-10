const carrossel = document.getElementById('carrossel');
const leftButton = document.querySelector('.nav-button.left');
const rightButton = document.querySelector('.nav-button.right');

function scrollLeft() {
    carrossel.scrollBy({
        left: -carrossel.clientWidth,
        behavior: 'smooth'
    });
}

function scrollRight() {
    carrossel.scrollBy({
        left: carrossel.clientWidth,
        behavior: 'smooth'
    });
}

leftButton.addEventListener('click', scrollLeft);
rightButton.addEventListener('click', scrollRight);

carrossel.addEventListener('scroll', function() {
    const maxScrollLeft = carrossel.scrollWidth - carrossel.clientWidth;
    leftButton.disabled = carrossel.scrollLeft === 0;
    rightButton.disabled = carrossel.scrollLeft >= maxScrollLeft;
});

window.addEventListener('load', function() {
    const maxScrollLeft = carrossel.scrollWidth - carrossel.clientWidth;
    leftButton.disabled = carrossel.scrollLeft === 0;
    rightButton.disabled = carrossel.scrollLeft >= maxScrollLeft;
});