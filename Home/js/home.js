const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  //Fazendo aparecer os itens
  const navLinks = document.querySelectorAll('.nav-links li');

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

