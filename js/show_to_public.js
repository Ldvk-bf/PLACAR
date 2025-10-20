const canalModo = new BroadcastChannel("modoApresentacao");

  function mostrarNoPublico(modo) {
    canalModo.postMessage({ modo });
    alert("Apresentação pública alterada para: " + modo.toUpperCase());
  }