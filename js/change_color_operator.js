const canalColor = new BroadcastChannel("competidorsPosition");
var nextID

function changeColor() {
    nextID = document.body.id
    canalColor.postMessage({ nextID });
    bodyColorChange();
}

function bodyColorChange() {
    const elemento = document.getElementById("bodyException");
    if (elemento) {
        elemento.id = " ";
    } else {
        document.body.id = "bodyException";
    }
}

canalColor.onmessage = (event) => {
    const requestColorState = event.data.requestColorState;
    console.log("Color changed in message:", requestColorState);

    canalColor.postMessage({ nextID });
};