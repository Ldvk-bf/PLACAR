// ===================
//   KATA PUBLIC VIEW
// ===================

const canal = new BroadcastChannel("placarKata");

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

window.addEventListener("resize", () => {
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
});

canal.onmessage = (event) => {
  const dados = event.data;
  if (!dados) return;

  document.getElementById("nameShowAka").innerText = dados.nameShowAka || "Select a kata";
  document.getElementById("nameShowAo").innerText = dados.nameShowAo || "Select a kata";

  ajustarTamanhoTexto("nameShowAka");
  ajustarTamanhoTexto("nameShowAo");
};

// -------- Inicialização --------
window.addEventListener("load", () => {
    const salvo = localStorage.getItem("ultimoEstadoKata");

    if (salvo) {
        const dados = JSON.parse(salvo);
        document.getElementById("nameShowAka").innerText = dados.nameShowAka;
        document.getElementById("nameShowAo").innerText = dados.nameShowAo;
        
        ajustarTamanhoTexto("nameShowAka");
        ajustarTamanhoTexto("nameShowAo");

        setTimeout(() => enviarEstado(), 300);
    }
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
});
