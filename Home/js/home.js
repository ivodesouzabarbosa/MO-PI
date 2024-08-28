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

// estrutura de caso
// let n = prompt("Digite sua idade para saber se ")

// switch(n) { 
//   case "1":
//     alert("Domingo")
//     break;
//   case "2":
//     alert("segunda")
//     break;
//   case "3":
//     alert("Terça")
//     break;
//   case "4":
//     alert("Quarta")
//     break;
//   case "5":
//     alert("Quinta")
//     break;
//   case "6":
//     alert("Sexta")
//     break;
//   case "7":
//     alert("Sábado")
//     break;
//   default:
//     alert("Escolha um número entre 0 a 6")
// }


// Laço de repetição com quantidade específica de repetição
// var n1 = prompt("digite um número para multiplicar");
// var n2 = 1;

// while(n2 <= 10) {
//   var resultado = n1 * n2;
//   console.log(n1 + " x " + n2 + " = " + resultado);
//   n2++;
// }

// laço de retição for
// for(let i = 1; i <= 5; i++) {
//   console.log(i)
// } 

// laço de repetição while
// let i = 1;
// while (i <=5) {
//   console.log(i);
//   i++;
// }

// Repetição com forEach
// const frutas = ["maçã", "banana", "goiaba", "melancia"] //os índices de um arrey começa com '0' 

// // 'item =>' é igual a 'function(item)'
// frutas.forEach(item => {
//   console.log(item)
// });