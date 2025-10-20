// ===================
//   KATA OPERATOR
// ===================

// Categorias e nomes de kata
const categorias = {
    junro: ["Junro Shodan", "Junro Nidan", "Junro Sandan", "Junro Yondan", "Junro Godan"],
    shiteikata: ["Jo No Kata", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan", "Tekki Shodan"],
    senteikata: ["Kankū-dai", "Bassai-dai", "Jion", "Enpi"],
    tokuikata: ["Tekki Nidan", "Tekki Sandan", "Kankū-sho", "Bassai-sho", "Gojūshiho-sho", "Gojūshiho-dai", "Nijūshiho", "Jiin", "Jitte", "Chinte", "Unsū", "Gankaku", "Sōchin", "Meikyō", "Hangetsu", "Wankan"],
    kotenkata: ["Kakuyoku Shodan", "Kakuyoku Nidan", "Kakuyoku Sandan", "Meikyō Nidan", "Suishu", "Kashu", "Roshu", "Hachimon", "Rantai", "Rakuyō", "Senshō", "Seiryū", "Kibaken", "Yonsō"],
    kobudo: ["Suushi No Kon", "Sueyoshi No Kon", "Sakugawa No Kon", "Shirotaru No Kon", "Matsukaze No Kon", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan"]
};

// Canal de sincronização
const canal = new BroadcastChannel("placarKata");

// -------- Atualizar selects --------
function atualizarLista(categoriaSelectId, nomeSelectId) {
    const categoriaSelecionada = document.getElementById(categoriaSelectId).value;
    const nomeSelect = document.getElementById(nomeSelectId);

    nomeSelect.innerHTML = "<option value=''>Select a kata</option>";

    if (categoriaSelecionada && categorias[categoriaSelecionada]) {
        categorias[categoriaSelecionada].forEach(nome => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        nomeSelect.appendChild(option);
        });
    }

    enviarEstado();
}

// -------- Mostrar kata selecionado --------
function ajustarTamanhoTexto(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const metadeTela = window.innerWidth / 2 - 50; // metade da largura da tela
    let fontSize = 200; // começa grande
    el.style.fontSize = fontSize + "px";

    // Reduz até caber
    while (el.scrollWidth > metadeTela && fontSize > 10) {
        fontSize -= 2;
        el.style.fontSize = fontSize + "px";
    }
}

// Ajusta automaticamente quando o texto muda
function mostrarNome(nomeSelectId, nameShowId) {
    const select = document.getElementById(nomeSelectId);
    const nomeSelecionado = select.value;
    const exibido = document.getElementById(nameShowId);

    exibido.innerText = nomeSelecionado || "Select a kata";
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
    enviarEstado();
}

// Também reexecuta quando a tela é redimensionada
window.addEventListener("resize", () => {
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
});

// -------- Buscar kata por texto --------
function buscarKata(texto) {
    if (!texto) return [];

    const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = normalize(texto);
    const resultados = [];

    for (const [categoria, lista] of Object.entries(categorias)) {
        lista.forEach(nome => {
        if (normalize(nome).includes(q)) {
            resultados.push({ categoria, nome });
        }
        });
    }

    return resultados;
}

// -------- Comunicação com o público --------
function capturarEstado() {
    return {
        categorySelectAka: document.getElementById("categorySelectAka")?.value || "",
        nameSelectAka: document.getElementById("nameSelectAka")?.value || "",
        nameShowAka: document.getElementById("nameShowAka")?.innerText || "",

        categorySelectAo: document.getElementById("categorySelectAo")?.value || "",
        nameSelectAo: document.getElementById("nameSelectAo")?.value || "",
        nameShowAo: document.getElementById("nameShowAo")?.innerText || "",
    };
}

function enviarEstado() {
    const estado = capturarEstado();
    canal.postMessage(estado);
    localStorage.setItem("ultimoEstadoKata", JSON.stringify(estado));

    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
}

// -------- Inicialização --------
window.addEventListener("load", () => {
    const salvo = localStorage.getItem("ultimoEstadoKata");

    if (salvo) {
        const dados = JSON.parse(salvo);

        if (dados.categorySelectAka) {
            document.getElementById("categorySelectAka").value = dados.categorySelectAka;
            atualizarLista("categorySelectAka", "nameSelectAka");
        }

        if (dados.nameSelectAka) {
            document.getElementById("nameSelectAka").value = dados.nameSelectAka;
            document.getElementById("nameShowAka").innerText = dados.nameShowAka;
        }

        if (dados.categorySelectAo) {
            document.getElementById("categorySelectAo").value = dados.categorySelectAo;
            atualizarLista("categorySelectAo", "nameSelectAo");
        }

        if (dados.nameSelectAo) {
            document.getElementById("nameSelectAo").value = dados.nameSelectAo;
            document.getElementById("nameShowAo").innerText = dados.nameShowAo;
        }
        // Reenvia para o público após restaurar
        setTimeout(() => enviarEstado(), 300);
    } else {
        enviarEstado(); // Envia estado inicial vazio
    }
    
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
});
