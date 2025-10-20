// ===================
//   KUMITE PÚBLICO
// ===================

const canal = new BroadcastChannel("placarKumite");

function formatarTempo(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function atualizarPlacar(dados) {

    console.log("Estou recebendo dados no kumite público:", dados);
  if (!dados) return;
  document.getElementById("pointsAka").innerText = dados.pointsAka;
  document.getElementById("pointsAo").innerText = dados.pointsAo;
  document.getElementById("jogaiAka").innerText = dados.jogaiAka;
  document.getElementById("jogaiAo").innerText = dados.jogaiAo;
  document.getElementById("faultAka").innerText = dados.faultAka;
  document.getElementById("faultAo").innerText = dados.faultAo;
  document.getElementById("tempo").innerText = formatarTempo(dados.tempo);
}

// Escuta o canal
canal.onmessage = (event) => {
  atualizarPlacar(event.data);
};
