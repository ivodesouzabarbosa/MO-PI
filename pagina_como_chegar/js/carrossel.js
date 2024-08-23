let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carrossel-slide');
    const totalSlides = slides.length;

    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    const newTransformValue = -currentIndex * 100;
    document.querySelector('.carrossel-wrapper').style.transform = `translateX(${newTransformValue}%)`;
}
