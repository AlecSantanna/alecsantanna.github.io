let numRows = 8;
let numCols = 6;

$(document).ready(function () {
  startSnakeGame();
});

function startSnakeGame() {
  for (let i = 0; i < numRows; i++) {
    const row = $("<tr></tr>");

    for (let j = 0; j < numCols; j++) {
      const cell = $(`<td class="cell text-center">&nbsp;</td>`);

      cell.click(function () {});

      row.append(cell);
    }

    $("#sneak-table").append(row);
  }
}
