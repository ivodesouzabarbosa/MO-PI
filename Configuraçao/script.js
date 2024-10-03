const selectIdioma = document.getElementById('select-idioma');
const switchTema = document.getElementById('switch-tema');

selectIdioma.addEventListener('change', () => {
    // Aqui você pode adicionar a lógica para mudar o idioma da página
    console.log(`Idioma selecionado: ${selectIdioma.value}`);
});

switchTema.addEventListener('change', () => {
    const body = document.body;
    body.classList.toggle('dark');
});

selectIdioma.addEventListener('change', () => {
  const selectedOption = selectIdioma.options[selectIdioma.selectedIndex];
  const flagImage = selectedOption.getAttribute('data-flag');
  const img = document.createElement('img');
  img.src = flagImage;
  img.width = 20; // tamanho da imagem da bandeira
  img.height = 20; // tamanho da imagem da bandeira
  selectedOption.innerHTML += ` ${img.outerHTML}`;
});