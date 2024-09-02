let n = 1000;

const characters = 'abcdefghijklmnopqrstuvwxyz@$#%^&*()_+=-.\'":?/><,';

const randomX = () => Math.floor(Math.random() * 99);
const randomColor = () => `var(--fg-${Math.floor(Math.random() * 9)})`;
const randomDuration = () => Math.floor(Math.random() * 8000 + 2000);
const randomDelay = () => Math.floor(Math.random() * 50000);
const generateLetter = () => characters.charAt(Math.floor(Math.random() * characters.length));

const ascii = (duration, delay, x, id) =>
  `<div class="ascii" style="
              --duration:${duration}ms;
              --delay: ${delay}ms;
              --left:${x}%;
              color:${randomColor()};
  " id="ascii-${id}">${generateLetter()}</div>`;

const container = document.querySelector('.container');

for (let i = 0; i < n; i++) {
  const duration = randomDuration();
  const delay = randomDelay();
  const x = randomX();
  const element = ascii(duration, delay, x, i);

  container.insertAdjacentHTML('afterbegin', element);
  const asciiElement = document.getElementById(`ascii-${i}`);

  asciiElement.addEventListener('animationstart', () => {
    setInterval(() => {
      asciiElement.innerText = generateLetter();
      asciiElement.style.color = randomColor();
    }, 100);
  });
}
