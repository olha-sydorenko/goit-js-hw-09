import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const dataDays = document.querySelector('.value[data-days]');
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]'); 
const dataSeconds = document.querySelector('.value[data-seconds]');
startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
        alert('Please choose a date in the future');    
    } else {
        startBtn.removeAttribute('disabled');
    }
    },
  };

  const fp = flatpickr('#datetime-picker', options);
  

  startBtn.addEventListener('click', ()=> {
  const timerId = setInterval(() => {
      const diff = fp.selectedDates[0].getTime() - Date.now();
     if (diff <=0) {
         clearInterval(timerId);
         return;
     } 
    const { days, hours, minutes, seconds } = convertMs(diff);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
    
}, 1000);

console.log (timerId);

}) 



  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
      return String(value).padStart(2, 0);
  }

