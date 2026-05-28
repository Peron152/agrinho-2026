document.addEventListener('DOMContentLoaded', function () {
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');

    // Correção de bug de classe: o HTML usava 'rotacao-botao', mas o JS tentava 'rotacao-botao'
    botaoDeAcessibilidade.addEventListener('click', function () {
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');

        const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado);
    });
    
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');

    // Configurações de limites para o tamanho da fonte (evita que o texto suma ou quebre o layout)
    let tamanhoAtualFonte = 1;
    const LIMITE_MAXIMO = 1.5;
    const LIMITE_MINIMO = 0.8;

    aumentaFonteBotao.addEventListener('click', function () {
        if (tamanhoAtualFonte < LIMITE_MAXIMO) {
            tamanhoAtualFonte += 0.1;
            // Aplica o tamanho no elemento HTML raiz para que todo o site (usando rem) aumente proporcionalmente
            document.documentElement.style.fontSize = `${tamanhoAtualFonte}rem`;
        }
    });

    diminuiFonteBotao.addEventListener('click', function () {
        if (tamanhoAtualFonte > LIMITE_MINIMO) {
            tamanhoAtualFonte -= 0.1;
            document.documentElement.style.fontSize = `${tamanhoAtualFonte}rem`;
        }
    });

    // Alto Contraste com persistência (salva a escolha do usuário mesmo se ele atualizar a página)
    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }

    alternaContraste.addEventListener('click', function () {
        document.body.classList.toggle('alto-contrast');
        
        // Salva a preferência no navegador do usuário
        const modoAtivo = document.body.classList.contains('alto-contraste');
        localStorage.setItem('altoContraste', modoAtivo);
    });

    // =========================================================================
    // NOVIDADE: Efeito de Revelação (Animação ao scroll) para seções de Big Data
    // =========================================================================
    const secoesAgro = document.querySelectorAll('.agro');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    secoesAgro.forEach(secao => {
        // Estilização inicial via JS para garantir que funcione mesmo se o CSS não carregar
        secao.style.opacity = '0';
        secao.style.transform = 'translateY(20px)';
        secao.style.transition = 'all 0.6s ease-out';
        observer.observe(secao);
    });
});