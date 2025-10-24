// ===================
//   KATA OPERATOR
// ===================

// Categorias e nomes de kata
const categorias = {
  junro: ["Junro Shodan", "Junro Nidan", "Junro Sandan", "Junro Yondan", "Junro Godan"],
  shiteikata: ["Jo No Kata", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan", "Tekki Shodan"],
  senteikata: ["Bassai-dai", "Enpi", "Jion", "Kankū-dai"],
  tokuikata: ["Bassai-sho", "Chinte", "Gankaku", "Gojūshiho-dai", "Gojūshiho-sho", "Hangetsu", "Jiin", "Jitte", "Kankū-sho", "Meikyō", "Nijūshiho", "Sōchin", "Tekki Nidan", "Tekki Sandan", "Unsū", "Wankan"],
  kotenkata: ["Kakuyoku Shodan", "Kakuyoku Nidan", "Kakuyoku Sandan", "Meikyō Nidan", "Suishu", "Kashu", "Roshu", "Hachimon", "Rantai", "Rakuyō", "Senshō", "Seiryū", "Kibaken", "Yonsō", "Jokko Issei", "Jokko Nissei", "Jokko Sansei", "Jokko Yonsei", "Jokko Gossei", "Kyakusen"],
  kobudo: ["Suushi No Kon", "Sueyoshi No Kon", "Sakugawa No Kon", "Shirotaru No Kon", "Matsukaze No Kon", "Heian Shodan", "Heian Nidan", "Heian Sandan", "Heian Yondan", "Heian Godan"],
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

  const metadeTela = window.innerWidth / 2 - 50;
  let fontSize = 200;
  el.style.fontSize = fontSize + "px";

  while (el.scrollWidth > metadeTela && fontSize > 10) {
    fontSize -= 2;
    el.style.fontSize = fontSize + "px";
  }
}

function mostrarNome(nomeSelectId, nameShowId) {
  const select = document.getElementById(nomeSelectId);
  const nomeSelecionado = select.value;
  const exibido = document.getElementById(nameShowId);

  exibido.innerText = nomeSelecionado || "Select a kata";
  ajustarTamanhoTexto("nameShowAka");
  ajustarTamanhoTexto("nameShowAo");
  enviarEstado();
}

window.addEventListener("resize", () => {
  ajustarTamanhoTexto("nameShowAka");
  ajustarTamanhoTexto("nameShowAo");
  enviarEstado();
});

// -------- Comunicação e armazenamento --------
function capturarEstado() {
  return {
    categorySelectAka: document.getElementById("categorySelectAka")?.value || "",
    nameSelectAka: document.getElementById("nameSelectAka")?.value || "",
    nameShowAka: document.getElementById("nameShowAka")?.innerText || "",
    categorySelectAo: document.getElementById("categorySelectAo")?.value || "",
    nameSelectAo: document.getElementById("nameSelectAo")?.value || "",
    nameShowAo: document.getElementById("nameShowAo")?.innerText || "",
    backgroundColor: document.body.style.backgroundColor || "#c00000",
  };
}

function enviarEstado() {
  const estado = capturarEstado();
  canal.postMessage(estado);
  localStorage.setItem("ultimoEstadoKata", JSON.stringify(estado));

  ajustarTamanhoTexto("nameShowAka");
  ajustarTamanhoTexto("nameShowAo");
}

// -------- Carregamento Inicial (versão Kumite-like) --------
window.addEventListener("load", () => {
  const salvo = localStorage.getItem("ultimoEstadoKata");

  if (salvo) {
    const dados = JSON.parse(salvo);

    // Restaura categorias e nomes
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

    // Restaura cor de fundo
    if (dados.backgroundColor) {
      document.body.style.backgroundColor = dados.backgroundColor;
    }
    
  } 

  ajustarTamanhoTexto("nameShowAka");
  ajustarTamanhoTexto("nameShowAo");
  enviarEstado();
});

// -------- Alternância de cores e IDs --------
const cores = ["#0000c0", "#c00000"]; // azul / vermelho
let index = 0;
let isAka = true;

document.getElementById("mudarCor").addEventListener("click", () => {
  document.body.style.backgroundColor = cores[index];
  index = (index + 1) % cores.length;
  alternarIDs();
  enviarEstado();
});

function alternarIDs() {
  if (isAka) {
    trocarSufixo("Aka", "Ao");
  } else {
    trocarSufixo("Ao", "Aka");
  }
  isAka = !isAka;
}

function trocarSufixo(antigo, novo) {
  const elementos = document.querySelectorAll(`[id$='${antigo}']`);
  elementos.forEach(el => {
    const novoId = el.id.replace(antigo, novo);
    el.id = novoId;
  });
}

canal.onmessage = (e) => {
  if (e.data.tipo === "pedido_estado") {
    enviarEstado();
  }
};