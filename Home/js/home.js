
// Menu hamburguer --------------------------------------------------------------------
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links-hdr');
  //Fazendo aparecer os itens
  const navLinks = document.querySelectorAll('.nav-links-hdr li');

  //Fazendo o clique do menu funcionar
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    //Animações links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navlinkFade 0.7s ease forwards ${index / 7 + 1.5}s`

      }
    });
    //Transformando em X
    burger.classList.toggle('toggle');


  });

}

navSlide();

// Carrossel -------------------------------------------------------------------------
let currentIndex = 0;
const intervalTime = 4000; // Intervalo de 3 segundos

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