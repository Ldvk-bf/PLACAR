const canalColor = new BroadcastChannel("competidorsPosition");

canalColor.onmessage = (event) => {
    const nextID = event.data.nextID;
    console.log("Color changed in message:", nextID);

    document.body.id = nextID;

};

window.addEventListener("load", () => {
    // Inicializa o estado da cor do corpo com base na mensagem recebida
    canalColor.postMessage({ requestColorState: true });
});