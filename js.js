const categorias = {
    junro: ["Junro Shodan", "Junro Nidan", "Junro Sandan", "Junro Yondan", "Junro Godan"],
    shiteikata: ["Jo No Kata", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan", "Tekki Shodan"],
    senteikata: ["Kankū-dai", "Bassai-dai", "Jion", "Enpi"],
    tokuikata: ["Tekki Nidan", "Tekki Sandan", "Kankū-sho", "Bassai-sho", "Gojūshiho-sho", "Gojūshiho-dai", "Nijūshiho", "Jiin", "Jitte", "Chinte", "Unsū", "Gankaku", "Sōchin", "Meikyō", "Hangetsu", "Wankan"],
    kotenkata: ["Kakuyoku Shodan", "Kakuyoku Nidan", "Kakuyoku Sandan", "Meikyō Nidan", "Suishu", "Kashu", "Roshu", "Hachimon", "Rantai", "Rakuyō", "Senshō", "Seiryū", "Kibaken", "Yonsō"],
    kobudo: ["Suushi No Kon", "Sueyoshi No Kon", "Sakugawa No Kon", "Shirotaru No Kon", "Matsukaze No Kon", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan"]
};


function atualizarLista(categoriaSelectId, nomeSelectId) {
    let categoriaSelecionada = document.getElementById(categoriaSelectId).value;
    let nomeSelect = document.getElementById(nomeSelectId);

    // Limpa as opções anteriores
    nomeSelect.innerHTML = "<option value=''>Selecione um nome</option>";

    if (categoriaSelecionada && categorias[categoriaSelecionada]) {
        categorias[categoriaSelecionada].forEach(nome => {
            let option = document.createElement("option");
            option.value = nome;
            option.textContent = nome;
            nomeSelect.appendChild(option);
        });
    }
}

function mostrarNome(nomeSelectId, nomeExibidoId) {
    let select = document.getElementById(nomeSelectId);
    let nomeSelecionado = select.value;
    document.getElementById(nomeExibidoId).innerText = nomeSelecionado ? nomeSelecionado : "Nenhum nome selecionado";
}


// KUMITE

let tempoPadrao = 180;
let tempoRestante = tempoPadrao;
let intervalo;

function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function iniciar() {
    // alert("Iniciado");
    document.getElementById("initialButton").style.backgroundColor = "rgba(255, 0, 0, 0)"; // totalmente opaco
    if (!intervalo) {
        intervalo = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
            } else {
                clearInterval(intervalo);
            }
        }, 1000);
    }
}

function pausar() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciar1min() {
    pausar();
    tempoRestante = 60;
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
}

function reiniciar2min() {
    pausar();
    tempoRestante = 120;
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
}

function reiniciar3min() {
    pausar();
    tempoRestante = 180;
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
}

function adicionarPonto(lutador) {
    let elemento = document.getElementById(`pontos${lutador}`);
    let pontos = parseInt(elemento.innerText);
    if (pontos < 4) {
        elemento.innerText = pontos + 1;
    }
}

function adicionarFalta(lutador) {
    let elemento = document.getElementById(`faltas${lutador}`);
    let faltas = parseInt(elemento.innerText);
    if (faltas < 3) {
        elemento.innerText = faltas + 1;
    }
}

function removerPonto(lutador) {
    let elemento = document.getElementById(`pontos${lutador}`);
    let pontos = parseInt(elemento.innerText);
    if (pontos > 0) {
        elemento.innerText = pontos - 1;
    }
}

function removerFalta(lutador) {
    let elemento = document.getElementById(`faltas${lutador}`);
    let faltas = parseInt(elemento.innerText);
    if (faltas > 0) {
        elemento.innerText = faltas - 1;
    }
}