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

    if (document.getElementById("nameShowAka")) {
        document.getElementById("nameShowAka").innerText = dados.nameShowAka || "Select a kata";
        document.getElementById("nameShowAo").innerText = dados.nameShowAo || "Select a kata";
        ajustarTamanhoTexto("nameShowAka");
        ajustarTamanhoTexto("nameShowAo");
        
    }

    if (document.getElementById("nameShow") != null) {
        console.log("Recebido no kata público:", event.data);
        document.body.style.backgroundColor = dados.backgroundColor;
        if (dados.backgroundColor == "rgb(0, 0, 192)") {
            document.getElementById("nameShow").innerText = dados.nameShowAo || "Select a kata";

        } else if (dados.backgroundColor == "rgb(192, 0, 0)") {
            document.getElementById("nameShow").innerText = dados.nameShowAka || "Select a kata";
        }
    }

    
};

// -------- Inicialização --------
window.addEventListener("load", () => {
    const salvo = localStorage.getItem("ultimoEstadoKata");

    if (salvo) {
        const dados = JSON.parse(salvo);
        if (document.getElementById("nameShowAka")) {
            document.getElementById("nameShowAka").innerText = dados.nameShowAka || "Select a kata";
        }
        if (document.getElementById("nameShowAo")) {
            document.getElementById("nameShowAo").innerText = dados.nameShowAo || "Select a kata";
        }

        if (document.getElementById("nameShow")) {
            document.body.style.backgroundColor = dados.backgroundColor;
            if (dados.backgroundColor == "#0000c0") {
                document.getElementById("nameShow").innerText = dados.nameShowAka || "Select a kata";

            } else if (dados.backgroundColor == "#c00000") {
                document.getElementById("nameShow").innerText = dados.nameShowAo || "Select a kata";
            }
        }

        ajustarTamanhoTexto("nameShowAka");
        ajustarTamanhoTexto("nameShowAo");

        // setTimeout(() => enviarEstado(), 300);
    }
    ajustarTamanhoTexto("nameShowAka");
    ajustarTamanhoTexto("nameShowAo");
});
