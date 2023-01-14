import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);


function onSubmit(event) {
  event.preventDefault();
const step = Number(form.step.value);
const amount = Number(form.amount.value);
const delay = Number(form.delay.value);

  for (let i = 1, j = delay;
    i <= amount;
    i += 1, j += step) {
      createPromise(i, j)
      .then(({position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch (({position, delay}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=> {
    if (shouldResolve) {
      resolve({ position, delay })// Fulfill
    } else {
      reject({ position, delay })// Reject
    }
  }, delay);
  });
  };