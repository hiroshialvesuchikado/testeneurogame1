console.log("Modo escrever iniciado!");


// ========================================
// ELEMENTOS DA IMAGEM E SVG
// ========================================

const imagem =
    document.getElementById("imagemCerebro");

const svg =
    document.getElementById("camadaHotspots");


// ========================================
// ESTRUTURAS
// ========================================

const estruturas =
    Array.from(
        document.querySelectorAll(".estrutura")
    );

console.log(
    "Estruturas encontradas:",
    estruturas.length
);


// ========================================
// ELEMENTOS DO JOGO
// ========================================

const campoResposta =
    document.getElementById("resposta");

const botaoResponder =
    document.getElementById("responder");

const feedback =
    document.getElementById("feedback");

const painelPontos =
    document.getElementById("pontos");

const painelErros =
    document.getElementById("erros");

const numeroQuestao =
    document.getElementById("numeroQuestao");

const totalQuestoes =
    document.getElementById("totalQuestoes");


// ========================================
// VARIÁVEIS
// ========================================

let estruturaAtual = null;

let pontos = 0;

let erros = 0;

let indiceQuestao = 0;


// ========================================
// CONFIGURAR SVG
// ========================================

function configurarSVG() {

    const largura =
        imagem.naturalWidth;

    const altura =
        imagem.naturalHeight;

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


// ========================================
// EMBARALHAR
// ========================================

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

        [
            lista[i],
            lista[j]
        ] = [
            lista[j],
            lista[i]
        ];
    }

    return lista;
}


const ordemQuestoes =
    embaralhar([...estruturas]);


if (totalQuestoes) {

    totalQuestoes.textContent =
        ordemQuestoes.length;
}


// ========================================
// NORMALIZAR TEXTO
// ========================================

function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();
}


// ========================================
// NOVA QUESTÃO
// ========================================

function novaQuestao() {

    if (ordemQuestoes.length === 0) {

        console.error(
            "Nenhuma estrutura encontrada no HTML!"
        );

        feedback.textContent =
            "Erro: nenhuma estrutura foi encontrada.";

        return;
    }


    if (
        indiceQuestao >=
        ordemQuestoes.length
    ) {

        finalizarJogo();

        return;
    }


    // remove destaque anterior

    estruturas.forEach(
        function(estrutura) {

            estrutura
                .classList
                .remove("destacada");

        }
    );


    estruturaAtual =
        ordemQuestoes[indiceQuestao];


    // adiciona destaque

    estruturaAtual
        .classList
        .add("destacada");


    console.log(
        "Estrutura destacada:",
        estruturaAtual.dataset.nome
    );

    console.log(
        "Classes:",
        estruturaAtual.className.baseVal
    );


    if (numeroQuestao) {

        numeroQuestao.textContent =
            indiceQuestao + 1;
    }


    campoResposta.value = "";

    feedback.textContent = "";

    campoResposta.focus();
}


// ========================================
// VERIFICAR RESPOSTA
// ========================================

function verificarResposta() {

    if (!estruturaAtual) {
        return;
    }


    const respostaUsuario =
        normalizar(
            campoResposta.value
        );


    const respostaCorreta =
        normalizar(
            estruturaAtual.dataset.nome
        );


    if (
        respostaUsuario ===
        respostaCorreta
    ) {

        pontos += 100;

        painelPontos.textContent =
            pontos;

        feedback.textContent =
            "✅ Correto!";

        estruturaAtual
            .classList
            .remove("destacada");

        indiceQuestao++;

        setTimeout(
            novaQuestao,
            1000
        );

    } else {

        erros++;

        painelErros.textContent =
            erros;

        feedback.textContent =
            "❌ Tente novamente.";

        campoResposta.select();
    }
}


// ========================================
// FINAL
// ========================================

function finalizarJogo() {

    estruturas.forEach(
        function(estrutura) {

            estrutura
                .classList
                .remove("destacada");

        }
    );

    document
        .getElementById("pergunta")
        .textContent =
        "Fim da rodada!";

    feedback.textContent =
        `Pontuação: ${pontos} | Erros: ${erros}`;

    campoResposta.disabled = true;

    botaoResponder.disabled = true;
}


// ========================================
// BOTÃO
// ========================================

botaoResponder.addEventListener(
    "click",
    verificarResposta
);


// ENTER

campoResposta.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            verificarResposta();

        }

    }
);


// ========================================
// INICIAR
// ========================================

novaQuestao();