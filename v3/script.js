// ========== UTIL / ESTAT GLOBAL ===========

const app = document.getElementById('app');
const overlay = document.getElementById('overlay');
const overlayTimer = document.getElementById('overlayTimer');
const timerDisplay = document.getElementById('timerDisplay');
const timerLabel = document.getElementById('timerLabel');

const methodInput = document.getElementById('methodInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const settingsBtn = document.getElementById('settingsBtn');
const drawer = document.getElementById('drawer');

const historyList = document.getElementById('historyList');
const exportCsv = document.getElementById('exportCsv');

const bgColor1 = document.getElementById('bgColor1');
const bgColor2 = document.getElementById('bgColor2');
const fontSel = document.getElementById('fontSel');
const saveStyle = document.getElementById('saveStyle');
const clearHistory = document.getElementById('clearHistory');

const durBtns = document.querySelectorAll('.dur-btn');
const customMinutes = document.getElementById('customMinutes');

// overlay click to reveal controls
overlay.addEventListener('click', () => {
    showControlsTemporarily();
});

// Estado del temporitzador
let timerState = {
    running: false,
    startTs: null,
    durationSec: 0,
    elapsedSec: 0,
    methodText: null,
    overtime: false,
    wakeLock: null,
    visibilityLost: false
};

// Historial en localStorage
const LS_HISTORY_KEY = 'estudi_history_v1';
const LS_STYLE_KEY = 'estudi_style_v1';

function loadHistory() {
    try {
        const h = JSON.parse(localStorage.getItem(LS_HISTORY_KEY) || '[]');
        return Array.isArray(h) ? h : [];
    } catch (e) {
        return [];
    }
}

function saveHistory(arr) {
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(arr));
}

function renderHistory() {
    const data = loadHistory().slice().reverse();
    historyList.innerHTML = '';
    if (!data.length) {
        historyList.innerHTML = '<div class="muted">Sense registres</div>';
        return;
    }
    data.forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.innerHTML = `<div>
            <div style="font-weight:700">${escapeHtml(item.methodText || '')}</div>
            <div class="muted">${dayjs(item.start).format('YYYY-MM-DD HH:mm')}</div>
        </div>
        <div style="text-align:right">
            <div style="font-weight:700">${formatMinutes(item.duration)}</div>
            <div class="muted">${item.leftApp ? 'Sortida durant sessió' : 'Sessió contínua'}</div>
        </div>`;
        historyList.appendChild(el);
    });
}

function formatMinutes(sec) {
    if (!sec) return '0m';
    const m = Math.floor(sec / 60);
    const h = Math.floor(m / 60);
    const rem = m % 60;
    return h ? `${h}h ${rem}m` : `${rem}m`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
}

// ================== CONFIG ESTILS ==================
function applyStyleFromStorage() {
    const s = JSON.parse(localStorage.getItem(LS_STYLE_KEY) || '{}');

    if (s.bg1) {
        document.documentElement.style.setProperty('--bg-start', s.bg1);
        bgColor1.value = s.bg1;
    }

    if (s.bg2) {
        document.documentElement.style.setProperty('--bg-end', s.bg2);
        bgColor2.value = s.bg2;
    }

    if (s.font) {
        if (s.font === 'Montserrat') {
            document.body.style.fontFamily = "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        } else if (s.font === 'Inter') {
            document.body.style.fontFamily = "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        } else if (s.font === 'Roboto Slab') {
            document.body.style.fontFamily = "'Roboto Slab', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        } else {
            document.body.style.fontFamily = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        }
        fontSel.value = s.font;
    }
}

// aplicar estils ja guardats
applyStyleFromStorage();

saveStyle.addEventListener('click', () => {
    const o = { bg1: bgColor1.value, bg2: bgColor2.value, font: fontSel.value };
    localStorage.setItem(LS_STYLE_KEY, JSON.stringify(o));
    applyStyleFromStorage();
    alert('Estil guardat localment');
});

// helper: update CSS var when bg1 color changes
bgColor1.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-start', e.target.value);
});

// helper: update CSS var when bg2 color changes
bgColor2.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-end', e.target.value);
});

// ================== DURACIONS / MÈTODES ==================
durBtns.forEach(b => b.addEventListener('click', () => {
    const mins = Number(b.dataset.min || 25);
    customMinutes.value = mins;
}));

startBtn.addEventListener('click', () => {
    const methodText = methodInput.value.trim();
    const hasCustom = String(customMinutes.value).trim() !== '';
    let minutes = hasCustom ? Math.max(0, Number(customMinutes.value) || 0) : 0;
    const durationSec = Math.max(0, Math.floor(minutes * 60));
    startSession(methodText || 'Sessió', durationSec);
});

stopBtn.addEventListener('click', () => { stopSession(true); });

settingsBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    drawer.setAttribute('aria-hidden', String(!drawer.classList.contains('open')));
});

document.addEventListener('click', (e) => {
    if (!drawer.classList.contains('open')) return;
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    const clickedInsideDrawer = path.includes(drawer);
    const clickedSettingsBtn = path.includes(settingsBtn);
    if (!clickedInsideDrawer && !clickedSettingsBtn) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
    }
});

clearHistory.addEventListener('click', () => {
    if (confirm('Netejar historial?')) {
        localStorage.removeItem(LS_HISTORY_KEY);
        renderHistory();
    }
});

exportCsv.addEventListener('click', () => {
    const arr = loadHistory();
    if (!arr.length) { alert('Sense dades per exportar'); return; }
    let csv = 'method_text,start,duration_sec,left_app\n';
    arr.forEach(r => csv += `"${(r.methodText||'').replace(/"/g,'""')}",${r.start},${r.duration || 0},${r.leftApp}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'historial_estudi.csv'; a.click(); URL.revokeObjectURL(url);
});

// ========== TIMER LOGIC ============
let tickInterval = null;
function startSession(methodText, durationSec) {
    if (timerState.running) return;
    timerState.running = true;
    timerState.startTs = Date.now();
    timerState.durationSec = durationSec;
    timerState.elapsedSec = 0;
    timerState.methodText = methodText;
    timerState.overtime = false;
    timerState.visibilityLost = false;

    app.classList.add('app-active');
    overlay.classList.add('active');
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    timerLabel.textContent = methodText || 'Sessió';

    requestWakeLock();

    if (document.fullscreenEnabled) { document.documentElement.requestFullscreen().catch(() => { }); }

    tickInterval = setInterval(() => {
        timerState.elapsedSec = Math.floor((Date.now() - timerState.startTs) / 1000);
        updateTimerUI();
    }, 250);

    document.addEventListener('visibilitychange', onVisibilityChange);

    const hist = loadHistory();
    hist.push({ methodText: methodText, start: new Date().toISOString(), duration: 0, leftApp: false });
    saveHistory(hist);
    renderHistory();
}

function updateTimerUI() {
    const secs = timerState.elapsedSec;
    const remaining = timerState.durationSec - secs;
    if (remaining < 0) timerState.overtime = true;
    const disp = Math.abs(remaining);
    const mm = Math.floor(disp / 60); const ss = disp % 60;
    const text = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    timerDisplay.textContent = timerState.overtime ? `+${text}` : text;
    overlayTimer.textContent = timerDisplay.textContent;
}

async function stopSession(manual) {
    if (!timerState.running) return;
    timerState.running = false;
    clearInterval(tickInterval); tickInterval = null;
    releaseWakeLock();
    try { if (document.fullscreenElement) await document.exitFullscreen(); } catch (e) { }

    const hist = loadHistory();
    if (hist.length) {
        const last = hist[hist.length - 1];
        last.duration = timerState.elapsedSec;
        last.leftApp = timerState.visibilityLost;
        saveHistory(hist);
    }

    app.classList.remove('app-active'); overlay.classList.remove('active');
    startBtn.style.display = 'inline-block'; stopBtn.style.display = 'none';
    timerLabel.textContent = 'Sense sessió';
    renderHistory();
}

function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
        timerState.visibilityLost = true;
    }
}

let revealTimeout = null;
function showControlsTemporarily() {
    app.classList.remove('app-active');
    overlay.classList.remove('active');
    startBtn.style.display = 'none'; stopBtn.style.display = 'inline-block';
    clearTimeout(revealTimeout);
    revealTimeout = setTimeout(() => {
        if (timerState.running) { app.classList.add('app-active'); overlay.classList.add('active'); }
    }, 5000);
}

// ========== Wake Lock helpers ===========
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            timerState.wakeLock = await navigator.wakeLock.request('screen');
            timerState.wakeLock.addEventListener('release', () => { timerState.wakeLock = null; });
        }
    } catch (e) { console.warn('WakeLock error', e); }
}
function releaseWakeLock() { if (timerState.wakeLock) { try { timerState.wakeLock.release(); timerState.wakeLock = null; } catch (e) { } } }

window.addEventListener('beforeunload', () => {
    if (timerState.running) {
        const hist = loadHistory();
        if (hist.length) {
            const last = hist[hist.length - 1];
            last.duration = timerState.elapsedSec;
            last.leftApp = true;
            saveHistory(hist);
        }
    }
});

setInterval(() => {
    if (timerState.running) {
        const hist = loadHistory();
        if (hist.length) {
            hist[hist.length - 1].duration = timerState.elapsedSec;
            hist[hist.length - 1].leftApp = timerState.visibilityLost;
            saveHistory(hist);
        }
    }
}, 2000);

overlay.addEventListener('touchstart', () => showControlsTemporarily());

renderHistory();
setInterval(() => { if (timerState.running) updateTimerUI(); }, 500);

gsap.to('.blob--a', { duration: 10, x: 40, y: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.blob--b', { duration: 12, x: -40, y: -20, repeat: -1, yoyo: true, ease: 'sine.inOut' });

timerDisplay.textContent = '00:00';
