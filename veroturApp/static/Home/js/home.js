
// Carrossel -------------------------------------------------------------------------

const carouselImages = document.querySelector('.carousel-images');
let index = 0;

setInterval(() => {
    index = (index + 1) % 3;
    carouselImages.style.transform = `translateX(${-index * 100}%)`;
}, 3000);