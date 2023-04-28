const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const valueSpan = document.querySelector('#value');
let value = 0;

increaseBtn.addEventListener('click', () => {
  value += 1;
  valueSpan.textContent = value;
});

decreaseBtn.addEventListener('click', () => {
  value -= 1;
  valueSpan.textContent = value;
});