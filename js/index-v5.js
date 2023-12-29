function updateProgressBar() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay);
  var progress = (dayOfYear / 365) * 100;
  var progressBar = document.getElementById("progress-bar");

  progressBar.style.width = progress + "%";
}

function updateCounter() {
  var now = new Date();

  var endOfYear = new Date(now.getFullYear() + 1, 0, 0);

  var diff = endOfYear - now;

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  var counter = document.getElementById("counter");
  var year = document.getElementById("year");

  var icon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>`;

  counter.innerHTML =
    icon +
    " " +
    days +
    " Dias " +
    hours +
    " Horas " +
    minutes +
    " Minutos " +
    seconds +
    " Segundos";
  year.innerHTML = now.getFullYear();
}

setInterval(updateCounter, 1000);
document
  .getElementById("darkModeSwitch")
  .addEventListener("change", function () {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute("data-bs-theme");

    if (currentTheme === "dark") {
      htmlElement.removeAttribute("data-bs-theme");
    } else {
      htmlElement.setAttribute("data-bs-theme", "dark");
    }
  });

window.onload = function () {
  updateProgressBar();
  updateCounter();

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // O usuário está acessando a partir de um dispositivo móvel
    mobile = true;
    numRows = 9;
    numCols = 6;
    numBombs = 10;
  } else {
    // O usuário está acessando a partir de um computador
    console.log("Usuário está em um computador");
  }
};

$("#loadGame1").on("click", function () {
  window.location.href = "minesweeper.html";
});
$("#loadGame2").on("click", function () {
  window.location.href = "fezinha.html";
});
