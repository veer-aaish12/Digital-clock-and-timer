/* SOUND */
const sound = new Audio(
  'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
);
sound.volume = 1;

/* DARK MODE */
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeToggle.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
};

/* PAGE SWITCH */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* CLOCK */
function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    date.textContent = now.toDateString();
    greeting.textContent =
        now.getHours() < 12 ? "Good Morning ☀️" :
        now.getHours() < 17 ? "Good Afternoon 🌤️" :
        now.getHours() < 21 ? "Good Evening 🌙" :
        "Good Night 🌌";
}
setInterval(updateClock, 1000);
updateClock();

/*  TIMER */
let totalSeconds = 0, timerInterval = null, running = false;

function updateTimerDisplay() {
    timerDisplay.textContent =
        String(Math.floor(totalSeconds / 60)).padStart(2,'0') + ":" +
        String(totalSeconds % 60).padStart(2,'0');
}

startBtn.onclick = () => {
    if (!running) {
        if (totalSeconds === 0)
            totalSeconds = (+minutes.value || 0) * 60 + (+seconds.value || 0);
        if (totalSeconds <= 0) return;
        running = true;
        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();
            if (totalSeconds === 0) {
                clearInterval(timerInterval);
                sound.play();
                running = false;
            }
        }, 1000);
    }
};

pauseBtn.onclick = () => { clearInterval(timerInterval); running = false; };
resetBtn.onclick = () => { clearInterval(timerInterval); totalSeconds = 0; updateTimerDisplay(); running = false; };

/*  ALARM (PROPER SET + ON/OFF) */
let alarmTimeValue = null;
let alarmEnabled = false;

setAlarmBtn.onclick = () => {
    if (!alarmTime.value) return alert("⛔ Select alarm time!");
    alarmTimeValue = alarmTime.value;
    alarmStatus.textContent = `Alarm set for ${alarmTimeValue} ⏰`;
};

alarmToggleBtn.onclick = () => {
    if (!alarmTimeValue) return alert("⛔ Set alarm first!");
    alarmEnabled = !alarmEnabled;
    alarmToggleBtn.textContent = alarmEnabled ? "🔕 ON" : "🔔 OFF";
    alarmStatus.textContent = alarmEnabled
        ? `Alarm ON ⏰ (${alarmTimeValue})`
        : "Alarm OFF";
};

setInterval(() => {
    if (!alarmEnabled || !alarmTimeValue) return;
    const now = new Date().toTimeString().slice(0,5);
    if (now === alarmTimeValue) {
        sound.play();
        navigator.vibrate([300,200,300]);
        alert("⏰ ALARM: " + alarmNote.value);
        alarmEnabled = false;
        alarmToggleBtn.textContent = "🔔 OFF";
    }
}, 1000);

/*  WORLD CLOCK */
function updateWorld() {
    worldTime.textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: countrySelect.value
    });
}
setInterval(updateWorld, 1000);
updateWorld();
