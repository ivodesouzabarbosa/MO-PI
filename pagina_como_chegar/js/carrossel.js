let currentIndex = 0;
const intervalTime = 4000; // Intervalo de 4 segundos

function moveSlide(step) {
    const slides = document.querySelectorAll('.carrossel-slide');
    const totalSlides = slides.length;

    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    const newTransformValue = -currentIndex * 100;
    document.querySelector('.carrossel-wrapper').style.transform = `translateX(${newTransformValue}%)`;
}

// Função para iniciar a transição automática dos slides
function startAutoSlide() {
    setInterval(() => {
        moveSlide(1); // Mover para o próximo slide
    }, intervalTime);
}

// Iniciar o slide automático ao carregar a página
window.onload = startAutoSlide;
