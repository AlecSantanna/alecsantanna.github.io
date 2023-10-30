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

$("#loadGame1").on("click", function () {
  $("#indexContent").addClass("hide");
  $("#gameContent").removeClass("hide");
  startMineSweeper();
});

$(".my-cell").click(function () {
  if (!$(this).hasClass("clicked")) {
    $(this).addClass("clicked");
  }
});

function calculateCells() {
  let nonBombCount = 0;
  let flagsFound = 0;
  $(".cell").each(function () {
    if (!$(this).hasClass("bomb")) {
      nonBombCount++;
    }
    if ($(this).hasClass("flag")) {
      flagsFound++;
    }
  });

  $("#nonBombCounter").html(nonBombCount - flagsFound);

  if (nonBombCount - flagsFound === 0) {
    $("#winOrLose").html("Você venceu!");
  }
}

function back() {
  destroyMineSweeper();
  $("#indexContent").removeClass("hide");
  $("#gameContent").addClass("hide");
}

function restartMineSweeper() {
  destroyMineSweeper();
  startMineSweeper();
}

function destroyMineSweeper() {
  $(".minesweeper-board").empty();
  $("#winOrLose").html("&nbsp;");
}

function startMineSweeper() {
  const explosionSound = document.getElementById("explosionSound");
  explosionSound.volume = 0.1;
  const numRows = 6;
  const numCols = 6;
  const numBombs = 5;
  let playing = true;
  let emojis = [];
  emojis[0] = "💣";
  emojis[1] = "😱";
  emojis[2] = "🧐";
  emojis[3] = "😏";
  emojis[4] = "😌";
  emojis[5] = "😎";

  function generateBombs() {
    const bombLocations = [];

    while (bombLocations.length < numBombs) {
      const row = Math.floor(Math.random() * numRows);
      const col = Math.floor(Math.random() * numCols);
      const location = `${row}-${col}`;

      if (!bombLocations.includes(location)) {
        bombLocations.push(location);
      }
    }

    return bombLocations;
  }

  for (let i = 0; i < numRows; i++) {
    const row = $("<tr></tr>");

    for (let j = 0; j < numCols; j++) {
      const cell = $('<td class="cell text-center h6">😴</td>');

      cell.click(function () {
        if (playing) {
          const isBomb = $(this).hasClass("bomb");
          if (isBomb) {
            $(this).addClass("bomb-found");
            $(this).text(`${emojis[0]}`);
            $("#winOrLose").html("Você clicou em uma bomba! Game Over!");
            playing = false;
            explosionSound.play(); // Reproduz o som de explosão
          } else {
            $(this).addClass("flag");
            const row = $(this).parent().index();
            const col = $(this).index();

            const distance = calculateDistance(row, col);

            $(this).text(distance + `${emojis[distance]}`);
          }
          calculateCells();
        }
      });

      row.append(cell);
    }

    $(".minesweeper-board").append(row);
  }

  const bombLocations = generateBombs();
  bombLocations.forEach((location) => {
    const [row, col] = location.split("-");
    $(`.minesweeper-board tr:eq(${row}) td:eq(${col})`).addClass("bomb");
  });

  function calculateDistance(row, col) {
    let minDistance = Infinity;

    bombLocations.forEach((location) => {
      const [bombRow, bombCol] = location.split("-");
      const distance = Math.abs(row - bombRow) + Math.abs(col - bombCol);
      minDistance = Math.min(minDistance, distance);
    });

    return minDistance;
  }
  calculateCells();
}

window.onload = function () {
  updateProgressBar();
  updateCounter();
};
