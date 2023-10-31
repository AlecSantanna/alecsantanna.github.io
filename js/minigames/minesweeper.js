let volumeIncreaseInterval;
const elevator = document.getElementById("elevatorSound");
const victorySound = document.getElementById("victory");
const explosionSound = document.getElementById("explosionSound");

elevator.loop = true;
elevator.volume = 0.01;
let hasVictory = false;
let mobile = false;

let numRows = 8;
let numCols = 6;
let numBombs = 5;

let emojis = [];
emojis[0] = "💣";
emojis[1] = "😱";
emojis[2] = "🧐";
emojis[3] = "😏";
emojis[4] = "😌";
emojis[5] = "😎";
emojis[6] = "😎";
emojis[7] = "😎";

$(document).ready(function () {
  $("#indexContent").addClass("hide");
  $("#gameContent").removeClass("hide");
  $("#game1").removeClass("hide");
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
    victory();
  }

  if (nonBombCount - flagsFound === 1) {
    //
  }
}

function showBombs() {
  $(".cell.bomb").each(function () {
    $(this).text(`${emojis[0]}`);
    $(this).addClass("bomb-found");
  });
}

function victory() {
  hasVictory = true;
  victorySound.volume = 0.7;
  victorySound.play();
  showBombs();
}

function back() {
    history.go(-1)
}

function restartMineSweeper() {
  destroyMineSweeper();
  startMineSweeper();
}

function destroyMineSweeper() {
  $(".minesweeper-board").empty();
  $("#winOrLose").html("&nbsp;");
  elevator.pause();
}

function increaseVolume(sound) {
  const volumeIncrement = 0.06;
  sound.volume += volumeIncrement;
}

function lose() {
  triggerClickOnBombs();
}

function triggerClickOnBombs() {
  $(".cell.bomb").each(function () {
    $(this).click();
  });
}

function startMineSweeper() {
  hasVictory = false;
  elevator.play();
  $("#bombsCount").html(`Bombas: ${numBombs}`);
  let playing = true;

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
      const cell = $(
        `<td class="cell text-center ${!mobile ? "h6" : "mob"}">😴</td>`
      );

      cell.click(function () {
        if (playing && !hasVictory) {
          const isBomb = $(this).hasClass("bomb");
          if (isBomb) {
            $(this).addClass("bomb-found");
            $(this).text(`${emojis[0]}`);
            $("#winOrLose").html("Você clicou em uma bomba! Game Over!");
            showBombs();
            playing = false;
            explosionSound.play();
            elevator.pause();
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
