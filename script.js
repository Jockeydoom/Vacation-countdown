const pad2 = (n) => String(n).padStart(2, '0');
const pad3 = (n) => String(n).padStart(3, '0');

// Flight time: 29 Aug 2025 @ 17:00 (UTC+04:00)
const eventDate = new Date('2025-08-29T17:00:00+04:00');

let lastMinute = null;

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  const timeElem = document.getElementById("hourMinuteSecond");
  const milliElem = document.getElementById("milliseconds");

  if (diff <= 0) {
    timeElem.textContent = "🛫 Have a great flight!";
    milliElem.textContent = "";
    return;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const milliseconds = diff % 1000;

  timeElem.innerHTML =
    `<span class="hours">${pad2(hours)} H</span> 
     <span class="minutes">${pad2(minutes)} M</span> 
     <span class="seconds">${pad2(seconds)} S</span>`;

  milliElem.innerHTML = `<span class="milliseconds">${pad3(milliseconds)} ms</span>`;

  // ✨ Pulse animation when minute changes
  if (lastMinute !== null && minutes !== lastMinute) {
    const minuteElem = timeElem.querySelector(".minutes");
    minuteElem.classList.remove("pulse");
    void minuteElem.offsetWidth; // restart trick
    minuteElem.classList.add("pulse");
  }
  lastMinute = minutes;
}

updateCountdown();
setInterval(updateCountdown, 10);
