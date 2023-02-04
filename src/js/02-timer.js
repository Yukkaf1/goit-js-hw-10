import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]')
const dataInput = document.querySelector('#datetime-picker')

const refs = {
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
min: document.querySelector('[data-minutes]'),
sec: document.querySelector('[data-seconds]'),
}


startBtn.disabled = true;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);


    return { days, hours, minutes, seconds };
};

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    //   console.log(new Date());
   
      startBtn.disabled = false;

      if (selectedDates[0] <= new Date())
      {
          startBtn.disabled = true;
          alert('Please choose a date in the future');
      }

selectedDates = selectedDates[0]
let timerId = null;
let isActive = false;

const timer = () => {

            if (isActive) {
                return;
            }
            isActive  = true;
            timerId = setInterval(() => {
                const today = Date.now();
                const value = selectedDates - today;
                // console.log(value);
              
                const { days, hours, minutes, seconds } = convertMs(value);
                
                refs.days.textContent = addLeadingZero(days);
                refs.hours.textContent = addLeadingZero(hours);
                refs.min.textContent = addLeadingZero(minutes);
                refs.sec.textContent = addLeadingZero(seconds);
                
            if (value <= 1000) { //86350000
                clearInterval(timerId);
                // console.log("the end");
                startBtn.disabled = false;
            }
            startBtn.disabled = true;
            }, 1000);

        }

startBtn.addEventListener('click', () => timer());
}};

const flatpick = flatpickr('#datetime-picker', options);
        
