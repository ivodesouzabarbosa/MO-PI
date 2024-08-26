document.addEventListener('DOMContentLoaded', function () {
    const mainAbout = document.querySelector('.main_about');
    const navLinks = mainAbout.querySelectorAll('.letter-main a');
    const articles = mainAbout.querySelectorAll('article[data-content]');

    function activateArticle(target) {
        articles.forEach(article => {
            article.classList.remove('active');
            article.style.maxHeight = '0';
            article.style.opacity = '0';
        });

        if (target) {
            target.classList.add('active');
            target.style.maxHeight = target.scrollHeight + 'px';
            target.style.opacity = '1';
        }
    }

    // Ativa o primeiro artigo por padrão
    activateArticle(articles[0]);

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const target = mainAbout.querySelector(`article[data-content="${this.getAttribute('data-target')}"]`);
            activateArticle(target);
        });
    });
});