const pomodoroButton = document.querySelector("#pomodoro");
const breakButton = document.querySelector("#break");
const pomodoroTime = document.querySelector("#pomodoro-time");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");

let minutes = 25;
let seconds = 0;
let timer;
let isStarted = false;
let mode = "pomodoro";

function addZero(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}

function startTimer() {
    timer = setInterval(updateTimer, 5);
}

function updateTimer() {
    pomodoroTime.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else if (seconds > 0) {
        seconds--;
    } else {
        seconds = 59;
        minutes--;
    }
}

function toggleStopStart() {
    if (!isStarted) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else {
        startTimer();
        startButton.textContent = 'Stop';
    }
    isStarted = !isStarted;
}

function pauseTimer() {
    isStarted = false;
    clearInterval(timer);
    startButton.textContent = 'Start';
}

function setTimeType(type) {
    if (type === "pomodoro") {
        mode = "pomodoro";
        minutes = 25;
        seconds = 0;
        pomodoroTime.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
        pomodoroButton.classList.add("active");
        breakButton.classList.remove("active");
    } else if (type === "break") {
        mode = "break";
        minutes = 5;
        seconds = 0;
        pomodoroTime.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
        pomodoroButton.classList.remove("active");
        breakButton.classList.add("active");
    }
    pauseTimer();
}

function resetTime() {
    if (mode === "pomodoro") {
        minutes = 25;
        seconds = 0;
        pomodoroTime.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
    } else {
        minutes = 5;
        seconds = 0;
        pomodoroTime.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
    }
    pauseTimer();

}

pomodoroButton.addEventListener("click", () => {
    setTimeType("pomodoro");
})
breakButton.addEventListener("click", () => {
    setTimeType("break");
});
startButton.addEventListener("click", toggleStopStart);
resetButton.addEventListener("click", resetTime);