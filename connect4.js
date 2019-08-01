/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let row = [];

  for (let i = 0; i < WIDTH; i++) {
    row.push(null);
  }

  for (let j = 0; j < HEIGHT; j++) {
    board.push([...row]);
  }

  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let boardTable = document.getElementById("board");
  // TODO: add comment for this code
  //create row above board, add click event listener
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //making the first row of board
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  boardTable.append(top);

  //making the rest of the board
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    boardTable.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let selectedIndex = board.length - 1;

  while (selectedIndex >= 0) {
    if (board[selectedIndex][x] === null) {
      return selectedIndex;
    }
    selectedIndex--;
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  let tableCellDiv = document.createElement('div');
  tableCellDiv.classList.add('piece', `p${currPlayer}`);

  let tableCell = document.getElementById(`${y}-${x}`);

  tableCell.appendChild(tableCellDiv);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  //if column is filled up, ignore click
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (checkRow(board)) {
    return endGame(`Game tied!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  switchPlayer();
}

function checkRow(board) {
  return board.every(row => !row.includes(null));
}

function switchPlayer() {
  return (currPlayer === 1 ? currPlayer = 2 : currPlayer = 1);
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //horiz, vert, diagDr, diagDL are the cells that will be tested in _win
  //every 4 cells are checked to see if they're a win 
  //_win also makes sure that every (y, x) cell is actually on the board
  //not every (y, x) cell in the for loop is on the board

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
