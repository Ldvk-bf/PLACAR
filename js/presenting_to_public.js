// Canal de comunicação entre abas
const canalModo = new BroadcastChannel("modoApresentacao");

// Função para carregar a tela pública conforme o modo
function carregarTela(modo) {
    const conteudo = document.getElementById("conteudo");

    if (modo === "kumite") {
        conteudo.innerHTML = `<iframe src="kumite.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    }
    else if (modo === "kata") {
        conteudo.innerHTML = `<iframe src="kata.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    }
    else if (modo === "kata_individual") {
        conteudo.innerHTML = `<iframe src="kata_individual.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    }
    else if (modo === "winner_aka") {
        conteudo.innerHTML = `<iframe src="../Winner/vitoria-aka.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    }
    else if (modo === "winner_ao") {
        conteudo.innerHTML = `<iframe src="../Winner/vitoria-ao.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    }
    else {
        conteudo.innerHTML = `<h1 style="text-align:center;margin-top:30vh;">Aguardando modo de apresentação...</h1>`;
    }
}

// Ao abrir, fica aguardando modo inicial
carregarTela(null);

// Lê modos salvos
let ultimoModo = localStorage.getItem("ultimoModoPublico");
let penultimoModo = localStorage.getItem("penultimoModoPublico");

// Se já houver modo salvo, carrega
if (ultimoModo) carregarTela(ultimoModo);

// Quando receber mensagem, atualiza modos
canalModo.onmessage = (e) => {
    const modo = e.data.modo;
    penultimoModo = ultimoModo;
    ultimoModo = modo;

    localStorage.setItem("penultimoModoPublico", penultimoModo);
    localStorage.setItem("ultimoModoPublico", ultimoModo);

    carregarTela(modo);
};
