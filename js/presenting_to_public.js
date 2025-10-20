const canalModo = new BroadcastChannel("modoApresentacao");

function carregarTela(modo) {
    const conteudo = document.getElementById("conteudo");



    if (modo === "kumite") {
    conteudo.innerHTML = `<iframe src="kumite.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    } 
    else if (modo === "kata") {
    conteudo.innerHTML = `<iframe src="kata.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    } 
    else if (modo === "kata_individual") {
    conteudo.innerHTML = `<iframe src="kata-individual.html" frameborder="0" style="width:100vw;height:100vh;"></iframe>`;
    } 
    else {
    conteudo.innerHTML = `<h1 style="text-align:center;margin-top:30vh;">Aguardando modo de apresentação...</h1>`;
    }
}

// Ao abrir, fica aguardando modo inicial
carregarTela(null);

// Quando o operador enviar um modo, atualiza
canalModo.onmessage = (e) => carregarTela(e.data.modo);

// Lê o último modo salvo (caso o operador tenha recarregado)
const ultimoModo = localStorage.getItem("ultimoModoPublico");
if (ultimoModo) carregarTela(ultimoModo);

// Sempre salva o último modo ao trocar
canalModo.onmessage = (e) => {
    const modo = e.data.modo;
    localStorage.setItem("ultimoModoPublico", modo);
    carregarTela(modo);
};
