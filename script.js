// ======================================================
// ELEMENTOS DO HTML
// ======================================================

const imagem = document.getElementById("imagemCerebro");
const svg = document.getElementById("camadaHotspots");

function configurarSVG() {

    const largura = imagem.naturalWidth;
    const altura = imagem.naturalHeight;

    svg.setAttribute(
        "viewBox",
        `0 0 ${largura} ${altura}`
    );

    console.log(
        "SVG configurado:",
        largura,
        "x",
        altura
    );
}

if (imagem.complete) {
    configurarSVG();
} else {
    imagem.addEventListener("load", configurarSVG);
}

console.log("NeuroGame iniciado!");


const pergunta = document.getElementById("pergunta");
const feedback = document.getElementById("feedback");

const painelPontos = document.getElementById("pontos");
const painelErros = document.getElementById("erros");

const numeroQuestao = document.getElementById("numeroQuestao");
const totalQuestoes = document.getElementById("totalQuestoes");


// ======================================================
// VARIÁVEIS DO JOGO
// ======================================================

let pontos = 0;

let erros = 0;

let questaoAtual = 0;

let estruturaAtual = null;

let bloqueado = false;


// ======================================================
// TODAS AS ESTRUTURAS DO SVG
// ======================================================

const estruturas =
    Array.from(
        document.querySelectorAll(".estrutura")
    );


// ======================================================
// CONFIGURA O SVG DE ACORDO COM A IMAGEM REAL
// ======================================================

function configurarSVG() {

    const largura = imagem.naturalWidth;
    const altura = imagem.naturalHeight;

    svg.setAttribute(
        "viewBox",
        `0 0 ${largura} ${altura}`
    );

    console.log(
        "SVG configurado:",
        largura,
        "x",
        altura
    );
}


if (imagem.complete) {

    configurarSVG();

} else {

    imagem.addEventListener(
        "load",
        configurarSVG
    );

}


// ======================================================
// EMBARALHAR ESTRUTURAS
// ======================================================

function embaralhar(lista) {

    for (
        let i = lista.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [lista[i], lista[j]] =
            [lista[j], lista[i]];

    }

    return lista;
}


// ======================================================
// CRIA A ORDEM ALEATÓRIA DAS QUESTÕES
// ======================================================

let ordemQuestoes =
    embaralhar([...estruturas]);


totalQuestoes.textContent =
    ordemQuestoes.length;


// ======================================================
// MOSTRAR NOVA QUESTÃO
// ======================================================

function novaQuestao() {

    // terminou todas as perguntas

    if (
        questaoAtual >=
        ordemQuestoes.length
    ) {

        finalizarJogo();

        return;

    }


    estruturaAtual =
        ordemQuestoes[questaoAtual];


    const nome =
        estruturaAtual.dataset.nome;


    pergunta.textContent =
        "Clique em: " + nome;


    numeroQuestao.textContent =
        questaoAtual + 1;


    feedback.textContent = "";


    bloqueado = false;

}


// ======================================================
// QUANDO O ALUNO CLICA EM UMA ESTRUTURA
// ======================================================

estruturas.forEach(
    function(estrutura) {

        estrutura.addEventListener(
            "click",
            function() {

                verificarResposta(
                    estrutura
                );

            }
        );

    }
);


// ======================================================
// VERIFICAR RESPOSTA
// ======================================================

function verificarResposta(
    estruturaClicada
) {

    if (bloqueado) {
        return;
    }


    // =============================================
    // ACERTO
    // =============================================

    if (
        estruturaClicada ===
        estruturaAtual
    ) {

        bloqueado = true;


        pontos += 100;


        painelPontos.textContent =
            pontos;


        feedback.textContent =
            "✅ Correto!";


        estruturaClicada
            .classList
            .add("correto");

       
const botaoReiniciar =
    document.getElementById("reiniciar");

        // espera um pouco antes
        // da próxima pergunta

        setTimeout(
            function() {

                estruturaClicada
                    .classList
                    .remove("correto");


                questaoAtual++;


                novaQuestao();

            },

            900
        );


    }


    // =============================================
    // ERRO
    // =============================================

    else {

        erros++;


        painelErros.textContent =
            erros;


        feedback.textContent =
            "❌ Não é essa. Tente novamente.";


        estruturaClicada
            .classList
            .add("errado");


        setTimeout(
            function() {

                estruturaClicada
                    .classList
                    .remove("errado");

            },

            500
        );

    }

}


// ======================================================
// FINAL DO JOGO
// ======================================================

function finalizarJogo() {

    bloqueado = true;

    pergunta.textContent =
        "🎉 Fim da rodada!";

    feedback.textContent =
        `Pontuação final: ${pontos} pontos | Erros: ${erros}`;

    botaoReiniciar
        .classList
        .add("visivel");
}

function reiniciarJogo() {

    // Zerar dados
    pontos = 0;
    erros = 0;
    questaoAtual = 0;

    estruturaAtual = null;

    bloqueado = false;


    // Atualizar painel
    painelPontos.textContent = 0;

    painelErros.textContent = 0;

    numeroQuestao.textContent = 1;


    // Limpar mensagens
    feedback.textContent = "";

    pergunta.textContent =
        "Preparando pergunta...";


    // Limpar informação anatômica
    if (caixaInfo) {
        caixaInfo.textContent = "";
    }


    // Limpar possíveis cores
    estruturas.forEach(
        function(estrutura) {

            estrutura.classList.remove(
                "correto",
                "errado"
            );

        }
    );


    // Embaralhar novamente
    ordemQuestoes =
        embaralhar([...estruturas]);


    totalQuestoes.textContent =
        ordemQuestoes.length;


    // Esconder botão
    botaoReiniciar
        .classList
        .remove("visivel");


    // Começar nova rodada
    novaQuestao();
}
// ======================================================
// COMEÇAR O JOGO
// ======================================================

novaQuestao();