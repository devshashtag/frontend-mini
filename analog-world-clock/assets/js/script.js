const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
const selector = document.getElementById('timezone');
let timeZone;

// get time based on timezone
function getTime(timeZone) {
  const currentDate = new Date();
  const milliseconds = currentDate.getMilliseconds();
  const localTime = currentDate.toLocaleString('en-US', { timeZone });
  const [hours, minutes, seconds] = localTime.split(' ')[1].split(':');

  return [hours, minutes, seconds, milliseconds];
}

// calculate hands rotation
function calculateRatio(time) {
  const [hours, minutes, seconds, milliseconds] = time;

  const millisecondRatio = milliseconds / 1000;
  const secondRatio = seconds / 60 + millisecondRatio / 60;
  const minuteRatio = minutes / 60 + secondRatio / 60;
  const hourRatio = hours / 12 + minuteRatio / 12;

  return [hourRatio, minuteRatio, secondRatio];
}

// update clock hands
function updateClock() {
  const setRotation = (element, rotationRatio) => element.style.setProperty('--rotation', rotationRatio * 360);
  const time = getTime(timeZone);
  const [hr, mr, sr] = calculateRatio(time);

  // set rotation
  setRotation(secondHand, sr);
  setRotation(minuteHand, mr);
  setRotation(hourHand, hr);
}

// change timezone
function changeTimeZone() {
  timeZone = selector.options[selector.selectedIndex].value;

  const transition = 'transform .5s linear';
  hourHand.style.transition = transition;
  minuteHand.style.transition = transition;
  secondHand.style.transition = transition;

  setTimeout(function () {
    hourHand.style.transition = '';
    minuteHand.style.transition = '';
    secondHand.style.transition = '';
  }, 3000);
}

changeTimeZone();
setInterval(updateClock, 100);

selector.addEventListener('change', changeTimeZone);
