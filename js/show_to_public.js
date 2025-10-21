const canalModo = new BroadcastChannel("modoApresentacao");

// Envia o modo para o público
function mostrarNoPublico(modo) {
    canalModo.postMessage({ modo });
}

// Volta para o modo anterior
function voltarModoAnterior() {
    const penultimo = localStorage.getItem("penultimoModoPublico");
    if (penultimo) {
        mostrarNoPublico(penultimo);
    } else {
        alert("Nenhum modo anterior encontrado!");
    }
}