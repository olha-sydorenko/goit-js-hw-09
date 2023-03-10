function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', ()=> {
timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
startBtn.setAttribute('disabled', 'true');
stopBtn.removeAttribute('disabled')
});

  stopBtn.addEventListener('click', ()=> {
      clearInterval(timerId);
      startBtn.removeAttribute('disabled'); 
      stopBtn.setAttribute('disabled', 'true');    
  });

  
