class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.currentMode = 'work';
        this.timer = null;
        this.isRunning = false;

        this.initializeUI();
        this.setupEventListeners();
    }

    initializeUI() {
        this.display = document.getElementById('timer-display');
        this.status = document.getElementById('current-status');
        this.workInput = document.getElementById('work-time');
        this.breakInput = document.getElementById('break-time');
        this.startButton = document.getElementById('start-btn');
        this.resetButton = document.getElementById('reset-btn');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.workInput.addEventListener('change', () => this.updateWorkTime());
        this.breakInput.addEventListener('change', () => this.updateBreakTime());
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startButton.textContent = '停止';
        this.startButton.style.backgroundColor = '#3498db';
        this.startButton.style.color = 'white';

        this.timer = setInterval(() => {
            if (this.currentMode === 'work') {
                if (this.workTime > 0) {
                    this.workTime--;
                    this.updateDisplay();
                } else {
                    this.workTime = parseInt(this.workInput.value) * 60;
                    this.currentMode = 'break';
                    this.status.textContent = '休憩中';
                    this.status.style.color = '#e74c3c';
                }
            } else {
                if (this.breakTime > 0) {
                    this.breakTime--;
                    this.updateDisplay();
                } else {
                    this.breakTime = parseInt(this.breakInput.value) * 60;
                    this.currentMode = 'work';
                    this.status.textContent = '作業中';
                    this.status.style.color = '#2ecc71';
                }
            }
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startButton.textContent = '開始';
        this.startButton.style.backgroundColor = '#2ecc71';
        this.startButton.style.color = 'white';
        clearInterval(this.timer);
    }

    resetTimer() {
        this.stopTimer();
        this.workTime = parseInt(this.workInput.value) * 60;
        this.breakTime = parseInt(this.breakInput.value) * 60;
        this.currentMode = 'work';
        this.status.textContent = '作業中';
        this.status.style.color = '#2ecc71';
        this.updateDisplay();
    }

    updateWorkTime() {
        if (!this.isRunning) {
            this.workTime = parseInt(this.workInput.value) * 60;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        if (!this.isRunning) {
            this.breakTime = parseInt(this.breakInput.value) * 60;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentMode === 'work' ? this.workTime / 60 : this.breakTime / 60);
        const seconds = Math.floor(this.currentMode === 'work' ? this.workTime % 60 : this.breakTime % 60);
        this.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
