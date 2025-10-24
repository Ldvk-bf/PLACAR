// ===================
//   KUMITE OPERATOR
// ===================

const Choose = {
  aka: 'Aka',
  ao: 'Ao',
  ippon: 'ippon',
  wazaari: "wazaari",
  fault: "fault",
  jogai: "jogai",
};

let isTimingRunning = false;
let tempoPadrao = 180;
let tempoRestante = tempoPadrao;
let intervalo = null;
let sino30Tocado = false;
let sinoFinalTocado = false;

const canal = new BroadcastChannel("placarKumite");

// -------- Tempo --------
function formatarTempo(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function tocarSinoFinal() {
  try {
    const audio = new Audio("../Assets/sino_2_toques.mp3");
    audio.currentTime = 0; // toca o som completo
    audio.play().catch(() => { });
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000); // toca 2 segundos inteiros
    sino30Tocado = false;
  } catch (_) { }
}

function tocarSino30s() {
  try {
    console.log("Tocando sino dos 30 segundos");
    const audio = new Audio("../Assets/sino_2_toques.mp3");
    // toca apenas do milissegundo 1100 até 2000
    audio.currentTime = 0.9; // 1.1 segundos = 1100 ms
    audio.play().catch(() => { });
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1100); // (2000 - 1100) = 900 ms de duração
    sino30Tocado = false;
  } catch (_) { }
}


function checkTime(time) {
  if (time <= 2 && !sinoFinalTocado) {
    sinoFinalTocado = true;
    tocarSinoFinal();
  } else if (time === 32 && !sino30Tocado) {
    sino30Tocado = true;
    tocarSino30s();
  }
}

function atualizarDisplay() {
  document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
}

function iniciar() {
  if (isTimingRunning) return;

  isTimingRunning = true;
  sino30Tocado = tempoRestante <= 30;
  sinoFinalTocado = tempoRestante <= 0;

  checkTime(tempoRestante);
  atualizarDisplay();
  enviarEstado();

  intervalo = setInterval(() => {
    if (tempoRestante > 0) {
      tempoRestante--;
      atualizarDisplay();
      checkTime(tempoRestante);
      enviarEstado();
    } else {
      clearInterval(intervalo);
      intervalo = null;
      isTimingRunning = false;
      enviarEstado();
    }
  }, 1000);
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;
  isTimingRunning = false;
  enviarEstado();
}

function add1sec() {
  tempoRestante++;
  atualizarDisplay();
  checkTime(tempoRestante);
  enviarEstado();
}

function remover1sec() {
  if (tempoRestante > 0) tempoRestante--;
  atualizarDisplay();
  checkTime(tempoRestante);
  enviarEstado();
}

function reiniciarTime(value) {
  if (!isTimingRunning) {
    tempoRestante = value;
    sino30Tocado = false;
    sinoFinalTocado = false;
    atualizarDisplay();
    enviarEstado();
  }
}

// -------- Pontos --------
function addValue(lutador, tipo) {
  let elemento = document.getElementById(`${tipo}${lutador}`);
  let pontos = parseInt(elemento.innerText);
  if (pontos < 4) {
    elemento.innerText = pontos + 1;
    if (tipo === Choose.ippon || tipo === Choose.wazaari) {
      let elementoPoints = document.getElementById(`points${lutador}`);
      let pontosTotal = parseInt(elementoPoints.innerText);
      elementoPoints.innerText = pontosTotal + (tipo === Choose.ippon ? 2 : 1);
    }
    enviarEstado();
  }
}

function removeValue(lutador, tipo) {
  let elemento = document.getElementById(`${tipo}${lutador}`);
  let pontos = parseInt(elemento.innerText);
  if (pontos > 0) {
    elemento.innerText = pontos - 1;
    if (tipo === Choose.ippon || tipo === Choose.wazaari) {
      let elementoPoints = document.getElementById(`points${lutador}`);
      let pontosTotal = parseInt(elementoPoints.innerText);
      elementoPoints.innerText = pontosTotal - (tipo === Choose.ippon ? 2 : 1);
    }
    enviarEstado();
  }
}

// -------- Reiniciar -------- 
function reiniciarPlacar() {
  if (!isTimingRunning) {
    document.querySelectorAll("#pointsAka, #pointsAo, #ipponAka, #ipponAo, #wazaariAka, #wazaariAo, #jogaiAka, #jogaiAo, #faultAka, #faultAo")
      .forEach(e => e.innerText = 0);

    tempoRestante = tempoPadrao;
    sino30Tocado = false;
    sinoFinalTocado = false;
    atualizarDisplay();
    enviarEstado();
  }
}

// -------- Comunicação --------
function capturarEstado() {
  return {
    tempo: tempoRestante,
    pointsAka: document.getElementById("pointsAka").innerText,
    pointsAo: document.getElementById("pointsAo").innerText,
    ipponAka: document.getElementById("ipponAka").innerText,
    ipponAo: document.getElementById("ipponAo").innerText,
    wazaariAka: document.getElementById("wazaariAka").innerText,
    wazaariAo: document.getElementById("wazaariAo").innerText,
    jogaiAka: document.getElementById("jogaiAka").innerText,
    jogaiAo: document.getElementById("jogaiAo").innerText,
    faultAka: document.getElementById("faultAka").innerText,
    faultAo: document.getElementById("faultAo").innerText
  };
}

function enviarEstado() {
  const estado = capturarEstado();
  canal.postMessage(estado);
}

// -------- Carregar estado salvo --------
window.addEventListener("load", () => {
  const salvo = localStorage.getItem("ultimoPlacarKumite");
  if (salvo) {
    const dados = JSON.parse(salvo);
    tempoRestante = dados.tempo || tempoPadrao;
    document.getElementById("pointsAka").innerText = dados.pointsAka || 0;
    document.getElementById("pointsAo").innerText = dados.pointsAo || 0;
    document.getElementById("ipponAka").innerText = dados.ipponAka || 0;
    document.getElementById("ipponAo").innerText = dados.ipponAo || 0;
    document.getElementById("wazaariAka").innerText = dados.wazaariAka || 0;
    document.getElementById("wazaariAo").innerText = dados.wazaariAo || 0;
    document.getElementById("jogaiAka").innerText = dados.jogaiAka || 0;
    document.getElementById("jogaiAo").innerText = dados.jogaiAo || 0;
    document.getElementById("faultAka").innerText = dados.faultAka || 0;
    document.getElementById("faultAo").innerText = dados.faultAo || 0;
    atualizarDisplay();
    setTimeout(() => enviarEstado(), 300);
  } else {
    enviarEstado();
  }
});
