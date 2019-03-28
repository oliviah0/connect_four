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

let offSet;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for ( let i = 0; i < HEIGHT; i++) {
    board.push(Array(WIDTH).fill(null))
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let board = document.querySelector("#board")

  //create table row, set IDs, and adds event listeners
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //add row of table cells and appends to table row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headCell.classList.add("hovered");
    top.append(headCell);
  }
  board.append(top);

  //creates a row and appends to board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--) {
    if(board[y][x] === null) {
      return y
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  let piece = document.createElement("div")
  piece.classList.add(`piece`, `p${currPlayer}`);
  let cell = document.getElementById(`${y}-${x}`);
  
  cell.appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function(){
    alert(msg)
  }, 1000)
  
}



/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  nextMove(x);

  // // get next spot in column (if none, ignore click)
  // let y = findSpotForCol(x);
  // if (y === null) {
  //   return;
  // }

  // // place piece in board and add to HTML table
  // placeInTable(y, x)
  // board[y][x] = currPlayer;

 
  //   if (checkForWin()) {
  //     let top = document.getElementById("column-top")
  //     top.removeEventListener("click", handleClick)
  //     return endGame(`Player ${currPlayer} won!`);
  //   }
  //   // check for tie
  //   if(checkForTie()) {
  //     return endGame("Game Over - Tie")
  //   }

  // // check for win

  
  // // switch players
  // // TODO: switch currPlayer 1 <-> 2
  // currPlayer = currPlayer === 1 ? 2 : 1;

}

function nextMove(x){
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x)
  board[y][x] = currPlayer;

 
    if (checkForWin()) {
      let top = document.getElementById("column-top")
      top.removeEventListener("click", handleClick)
      return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie
    if(checkForTie()) {
      return endGame("Game Over - Tie")
    }

  // check for win

  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  if(currPlayer === 2) {
    setTimeout(function(){
      playerTwoMove()
    }, 1000)
    
  }

}

function checkForTie() {
  //if the first row[0] is filled, that means that the rest of the board is filled.
  return board[0].every(cell => {
    return cell !== null;
  })


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

 
  //loops through row and then column
  //defines possible win combos from current y, x position
  //evalulates if the values next to it are filled - indicating a win

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

function playerTwoMove(){
  let x = Math.floor(Math.random()*HEIGHT)
  nextMove(x)
}

