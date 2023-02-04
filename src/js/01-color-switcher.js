const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const timer = {

    start () {
    this.intervalId = setInterval(() => {
    console.log('start');
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    }, 1000)
    },

    stop () {
    clearInterval(this.intervalId);
    // console.log('stop');
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    }
};

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});
