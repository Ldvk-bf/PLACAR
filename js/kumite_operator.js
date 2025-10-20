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

var isTimingRunning = false;
let tempoPadrao = 180;
let tempoRestante = tempoPadrao;
let intervalo;

// Canal de comunicação com o placar
const canal = new BroadcastChannel("placarKumite");

// -------- Tempo --------
function formatarTempo(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function iniciar() {
  if (!isTimingRunning) {
    if (tempoRestante > 0) {
      tempoRestante--;
      document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
      enviarEstado();
    } else {
        clearInterval(intervalo);
        enviarEstado();
    }
  }

  isTimingRunning = true;

  if (!intervalo) {
    intervalo = setInterval(() => {
      if (tempoRestante > 0) {
        tempoRestante--;
        document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
        enviarEstado();
      } else {
        clearInterval(intervalo);
        intervalo = null;
      }
    }, 1000);
  }
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;
  isTimingRunning = false;
  enviarEstado();
}

function add1sec() {
  tempoRestante++;
  document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
  enviarEstado();
}

function remover1sec() {
  tempoRestante--;
  document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
  enviarEstado();
}

function reiniciarTime(value) {
  if (!isTimingRunning) {
    tempoRestante = value;
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
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
    document.getElementById("pointsAka").innerText = 0;
    document.getElementById("pointsAo").innerText = 0;
    document.getElementById("ipponAka").innerText = 0;
    document.getElementById("ipponAo").innerText = 0;
    document.getElementById("wazaariAka").innerText = 0;
    document.getElementById("wazaariAo").innerText = 0;
    document.getElementById("jogaiAka").innerText = 0;
    document.getElementById("jogaiAo").innerText = 0;
    document.getElementById("faultAka").innerText = 0;
    document.getElementById("faultAo").innerText = 0;
    
    tempoRestante = tempoPadrao;
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);
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

window.addEventListener("load", () => {
  const salvo = localStorage.getItem("ultimoPlacarKumite");
  if (salvo) {
    const dados = JSON.parse(salvo);

    // Restaura todos os campos
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
    document.getElementById("tempo").innerText = formatarTempo(tempoRestante);

    // 2️⃣ Assim que carregar, reenvia para o público (placar)
    setTimeout(() => enviarEstado(), 300); // pequeno atraso para garantir renderização
  } else {
    // Caso não haja dados anteriores, envia o estado inicial
    enviarEstado();
  }
});