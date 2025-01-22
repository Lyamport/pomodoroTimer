const timerStatus = document.getElementById('timer-status')
const timerTime = document.getElementById('timer-time')

const restartBtn = document.getElementById('restart')
const startBtn = document.getElementById('play')
const skipBtn = document.getElementById('skip')

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

let isWorking = true
let time = WORK_TIME
let timerInterval

restartBtn.addEventListener('click', restartTimer)
startBtn.addEventListener('click', startTimer)
skipBtn.addEventListener('click', skipTimer)

function updateScreen() {
    let minute = Math.floor(time / 60)
    let second = time % 60

    let minutePrint = minute < 10 ? `0${minute}`:`${minute}` 
    let secondPrint = second < 10 ? `0${second}`:`${second}`

    timerStatus.textContent = isWorking ? 'Работа' : 'Отдых'
    timerTime.innerHTML = `${minutePrint}:${secondPrint}`
}

function startTimer(){
    if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
    } else {
        timerInterval = setInterval(() => {
            if (--time < 0) {
                isWorking = !isWorking
                time = (isWorking ? WORK_TIME : BREAK_TIME)
            }
            updateScreen()
        }, 1000)
    }
}

function restartTimer() {
    isWorking = true
    clearInterval(timerInterval)
    timerInterval = null
    time = WORK_TIME
    updateScreen()
}

function skipTimer() {
    isWorking = !isWorking
    time = (isWorking ? WORK_TIME : BREAK_TIME)
    clearInterval(timerInterval)
    timerInterval = null
    updateScreen()
}

