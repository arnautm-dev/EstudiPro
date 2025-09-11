// script.js

// Selecció d'elements
const methodSelect = document.getElementById('methodSelect');
const durationButtons = document.querySelectorAll('.durations button');
const customMinutes = document.getElementById('customMinutes');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timerEl = document.getElementById('timer');
const controls = document.getElementById('controls');
const historyList = document.getElementById('historyList');

let timerInterval = null;
let totalSeconds = 0;
let elapsedSeconds = 0;
let isRunning = false;

// Funció per actualitzar el temporitzador
function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

// Funció per començar el temporitzador
function startTimer() {
  if(isRunning) return;
  if(totalSeconds <= 0) return;
  isRunning = true;
  controls.classList.add('hidden');
  timerEl.classList.remove('hidden');
  stopBtn.classList.remove('hidden');

  timerInterval = setInterval(() => {
    totalSeconds--;
    elapsedSeconds++;
    updateTimer();
    if(totalSeconds < 0) { // mode overtime
      totalSeconds = 0;
    }
  }, 1000);
}

// Funció per aturar el temporitzador
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  controls.classList.remove('hidden');
  stopBtn.classList.add('hidden');
}

// Assignació de temps botons
durationButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    totalSeconds = parseInt(btn.dataset.time) * 60;
    updateTimer();
  });
});

// Input personalitzat
customMinutes.addEventListener('input', () => {
  totalSeconds = parseInt(customMinutes.value) * 60;
  updateTimer();
});

// Botons iniciar i aturar
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Historial simple
function addHistory(method, duration) {
  const li = document.createElement('li');
  li.textContent = `${method} - ${duration} min - ${new Date().toLocaleString()}`;
  historyList.appendChild(li);
  // Guardar a localStorage si vols persistència
}
