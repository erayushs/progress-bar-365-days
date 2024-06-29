// Declare variables and get saved values from localStorage
let progress = 0;
let percentage = 0;
let twenty_four = 0;

let sound = new Audio("click-sound.mp3");
let fluid = document.getElementById("fluid");
let button = document.getElementById("btn");
let p = document.getElementById("day");

// Get saved values from localStorage
let savedValueOfProgress = Number(localStorage.getItem("progress"));
let savedValueOfPercentage = Number(localStorage.getItem("percentage"));
let savedButtonDisableValue =
  localStorage.getItem("buttonDisableValue") === "true";
let savedValueOfTwenty_Four = Number(localStorage.getItem("twentyFourValue"));

// Update global variables from saved values
document.addEventListener("DOMContentLoaded", () => {
  progress = savedValueOfProgress || 0;
  percentage = savedValueOfPercentage || 0;
  button.disabled = savedButtonDisableValue || false;
  twenty_four = savedValueOfTwenty_Four || 86400000; // default to 24 hours if not set

  p.innerHTML = `Day <span>${progress}</span> Progress: <span>${percentage}%</span>`;
  fluid.style.width = `${progress}px`;
});

// Function to update the value of twenty_four
function updateTwentyFour(newValue) {
  twenty_four = newValue;
  localStorage.setItem("twentyFourValue", twenty_four); // Save the updated value to localStorage
}

// Event listener for the button
button.addEventListener("click", () => {
  button.disabled = true;

  // Update twenty_four to a new value when button is clicked
  updateTwentyFour(86400000); // Update to 1 minute (60000 milliseconds)

  setTimeout(() => {
    location.reload();
  }, 1000);

  localStorage.setItem("buttonDisableValue", button.disabled);

  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 300);

  if (progress !== 365) {
    progress += 1;
    fluid.style.width = `${progress}px`;
    percentage = progress * 0.273972602739726;
    percentage = ((percentage * 100) / 100).toFixed(2);

    p.innerHTML = `Day <span>${progress}</span> Progress: <span>${percentage}%</span>`;

    localStorage.setItem("progress", progress);
    localStorage.setItem("percentage", percentage);
  }
  if (progress === 365) {
    fluid.style.backgroundColor = "green";
  }

  // Update countdownDate after updating twenty_four
  let countDownDate = new Date().getTime() + twenty_four;
  localStorage.setItem("countDownDate", countDownDate);
});

// Countdown Timer
var countDownDate = localStorage.getItem("countDownDate");
if (!countDownDate) {
  countDownDate = new Date().getTime() + twenty_four;
  localStorage.setItem("countDownDate", countDownDate);
} else {
  countDownDate = parseInt(countDownDate);
}

// Update the countdown every 1 second
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML =
    hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "00 h 00 m 00 s";
    button.disabled = false;
    localStorage.removeItem("countDownDate");
  }
}, 10); // Set interval to 1000 milliseconds

// localStorage.clear();
