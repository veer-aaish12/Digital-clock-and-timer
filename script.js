var notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
notificationSound.volume = 1.0;

function playTimerSound() {
    notificationSound.currentTime = 0;
    notificationSound.play();
   
    setTimeout(function() {
        notificationSound.pause();
        notificationSound.currentTime = 0;
    }, 3000);
   
    var container = document.getElementById('container');
    container.classList.add('vibrate-animation');
    setTimeout(function() {
        container.classList.remove('vibrate-animation');
    }, 300);
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
   
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
   
    document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateClock, 1000);
updateClock();

var timerInterval;
var totalSeconds = 0;
var isRunning = false;

var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var timerDisplay = document.getElementById('timerDisplay');

function updateTimerDisplay() {
    var mins = Math.floor(totalSeconds / 60);
    var secs = totalSeconds % 60;
   
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
   
    timerDisplay.textContent = mins + ':' + secs;
}

function startTimer() {
    if (!isRunning) {
        if (totalSeconds === 0) {
            var mins = parseInt(minutesInput.value) || 0;
            var secs = parseInt(secondsInput.value) || 0;
            totalSeconds = mins * 60 + secs;
        }
       
        if (totalSeconds > 0) {
            isRunning = true;
            startBtn.textContent = 'Pause';
           
            timerInterval = setInterval(function() {
                totalSeconds--;
                updateTimerDisplay();
               
                if (totalSeconds % 60 === 0 && totalSeconds > 0) {
                    playTimerSound();
                }
               
                if (totalSeconds <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                    playTimerSound();
                }
            }, 1000);
        }
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = 'Resume';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = 0;
    startBtn.textContent = 'Start';
    timerDisplay.textContent = '00:00';
    minutesInput.value = 0;
    secondsInput.value = 0;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);