const canalColor = new BroadcastChannel("competidorsPosition");
var nextID

function changeColor() {
    nextID = document.body.id
    canalColor.postMessage({ nextID });
    bodyColorChange();
}

function bodyColorChange() {
    if (document.body.id == "bodyException") {
        document.body.id = " ";
    } else {
        document.body.id = "bodyException";
    }
}

canalColor.onmessage = (event) => {
    const requestColorState = event.data.requestColorState;
    console.log("Color changed in message:", requestColorState);

    if (requestColorState) {
        if (document.body.id == " ") {
            nextID = "bodyException";
        } else {
            nextID = " ";
        }
        canalColor.postMessage({ nextID, requestColorState: false });
    }
    

    
};