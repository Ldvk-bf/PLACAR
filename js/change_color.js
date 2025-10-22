const canalColor = new BroadcastChannel("competidorsPosition");
let colorChanged = false;

function changeColor() {
    colorChanged = !colorChanged;
    canalColor.postMessage({ colorChanged });
    bodyColorChange();
}

function bodyColorChange() {
    const elemento = document.getElementById("bodyException");
    if (elemento) {
        elemento.id = "";
    } else {
        document.body.id = "bodyException";
    }
}

canalColor.onmessage = (event) => {
    const colorChanged = event.data.colorChanged;
    console.log("Color changed in message:", colorChanged);
    
    // if (!dados) return;

    bodyColorChange();
};
