let savedValueOfProgress = Number(localStorage.getItem("progress"));
let savedValueOfPercentage = Number(localStorage.getItem("percentage"));

document.addEventListener("DOMContentLoaded", () => {
  progress = savedValueOfProgress;
  percentage = savedValueOfPercentage;
  p.innerHTML = `Day <span>${progress}</span> Progress: <span>${percentage}%</span>`;
  fluid.style.width = `${progress}px`;
});

let sound = new Audio("click-sound.mp3");

let progress = 0;

let fluid = document.getElementById("fluid");
let button = document.getElementById("btn");
let p = document.getElementById("day");

let percentage = 0;
button.addEventListener("click", () => {
  //   button.disabled = true;

  //   setTimeout(() => {
  //     button.disabled = false;
  //   }, 2000);

  //   sound.play();

  //   setTimeout(() => {
  //     sound.pause();
  //     sound.currentTime = 0;
  //   }, 1000);

  if (progress !== 365) {
    progress += 1;
    fluid.style.width = `${progress}px`;
    percentage = progress * 0.273972602739726;
    percentage = ((percentage * 100) / 100).toFixed(2);

    p.innerHTML = `Day <span>${progress}</span> Progress: <span>${percentage}%</span>`;

    localStorage.setItem("progress", progress); //saving values to local storage
    localStorage.setItem("percentage", percentage);
  }
  if (progress === 365) {
    fluid.style.backgroundColor = "green";
  }
});

p.innerHTML = `Day <span>${progress}</span> Progress: <span>${percentage}%</span>`;

console.log(savedValueOfProgress);
