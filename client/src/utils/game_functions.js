/*
    Functions needed:
    1. Check for a Win
        Given a board and an optional last move, return the number of the player that has won, and -1 for no win (ties are not possible)
    2. Make a move
        Given a player number, and a column number, and board, return a new board with the move made.
    3. Check if valid move
        Given a column number and board, check to make sure that the player can put their piece in that column (column is not full).
    
    The board will start empty. All arrays will have 0s. When a player makes a move, their player number is placed in the corresponding spot.
    The board is expected to be an array of strings, where each string comprises of 6 numbers, in string format. Each of these strings in the array
    represent a column on the board:

         Right
        000000
        000000
        000000
    Top 000000  Bottom
        000000
        000000
        000000
         Left
*/

export function checkWinner(board, columnNumber) {
    // Take in game and an optional column number (last column chosen). Then, if move is populated, check for 4 in a row based around that last move.
    // Otherwise, check the entire gameboard for a win.
    // column should be a number corresponding to the column (left to right 0 - 6) that the last move was made in.

    // There are four directions to check given a move. Up/Down, Left/Right, and the two diagonals.
    if (getVerticalWinCount(board, columnNumber) >= 4 ||
        getHorizontalWinCount(board, columnNumber) >= 4 ||
        getDiagonalWinLeftCount(board, columnNumber) >= 4 ||
        getDiagonalWinRightCount(board,columnNumber) >= 4) {
            return true;
    } else {
        return false;
    }
}

export function getVerticalWinCount(board, columnNumber) {
    // Check for win in columns. Column is the last column played.
    // If win, return true, else false.

    // Get the last move the player made in that column.
    let { lastMove, player } = getLastMove(board,columnNumber);
    // This means the column is empty
    if (!player) {
        return 0;
    }

    let winCount = 0;
    // The minimum amount of chips to win is 4, which would be spots 2, 3, 4, and 5.
    // If the last move is 0, 1 or 2, then it's possible, otherwise, it's not.
    for (let index = lastMove; index < board[columnNumber].length; index++) {
        if (board[columnNumber][index] === player) {
            winCount ++;
        } else {
            break;
        }
    }
    return winCount;
}

export function getHorizontalWinCount(board, columnNumber) {
    // Check for win in rows. ColumnNumber is the last column played.
    // If win, return true, else false
    let { lastMove, player } = getLastMove(board, columnNumber);
    // console.log(`Last move: column ${columnNumber}, row ${lastMove}`);

    if (!player) {
        return 0;
    }

    // Set to one as the columnNumber's chip is then counted.
    let winCount = 1;
    let winArray = [String(columnNumber) + String(lastMove)];

    // Check each column to the left of the played column at the played row's height. For each match in sequence, increment winCount.
    // Stop when a different/no chip is found.
    if (columnNumber !== 0) {
        for (let index = columnNumber; index >= 0; index--) {
            if (board[index][lastMove] === player) {
                // discount columnNumber's match.
                if (index !== columnNumber) {
                    winArray.push(String(index) + String(lastMove));
                    winCount++;
                }
            } else {
                break;
            }
        }
    }

    // Check each column to the right of the played column at the played row's height. For each match in sequence, increment winCount.
    // Stop when a different/no chip is found.
    if (columnNumber !== 6) {
        for (let index = columnNumber; index <= 6; index++) {
            if(board[index][lastMove] === player) {
                // discount columnNumber's match.
                if (index !== columnNumber) {
                    winArray.push(String(index) + String(lastMove));
                    winCount++;
                }
            } else {
                break;
            }
        }
    }

    return winCount;
}

export function getDiagonalWinLeftCount(board, columnNumber) {
    // Check for win from upper left to lower right diagonal. Column is the last column played (optional)
    // If win, return true, else false

    // go up first. Then, check to see if it's possible to win with what's below
    let { lastMove, player } = getLastMove(board, columnNumber);

    if (!player) {
        // column is empty
        return 0;
    }

    // defined for ease
    let column = columnNumber;
    let row = lastMove;

    // Takes into account the move that was just made.
    let winCount = 1;
    // let winMoves = []
    // winMoves.push(String(column) + String(row));

    // Check up and to the left
    // console.log(`Checking up and to the left`);
    if (column < 6 && row > 0) {
        for (let index = column; index <= 6; index++) {
            // console.log(`Checking column ${index}, row ${row}...`);
            if (row >= 0) {
                if (board[index][row] === player) {
                    // Account for duplicates
                    if (index !== column && row !== lastMove) {
                        winCount++;
                        // winMoves.push(String(index) + String(row));
                    }
                } else {
                    break;
                }
            } else {
                // I've hit the top of the board
                break;
            }
            row -= 1;
        }
    }

    row = lastMove;
    // console.log(`Checking down and to the right`)
    // Check down and to the right
    if (column > 0 && row < 5) {
        for (let index = column; index >= 0; index--) {
            // console.log(`Checking column ${index}, row ${row}...`);
            if (row <= 5) {
                if (board[index][row] === player) {
                    // Account for duplicates
                    if (index !== column && row !== lastMove) {
                        winCount++;
                        // winMoves.push(String(index) + String(row));
                    }
                } else {
                    break;
                }
            } else {
                // I've hit the bottom....
                break;
            }
            row += 1;
        }
    }

    return winCount;

}

export function getDiagonalWinRightCount(board, columnNumber = -1) {
    // Check for win from upper right to lower left diagonal. Column is the last column played (optional)
    // If win, return true, else false.

    // go up first. Then, check to see if it's possible to win with what's below
    let { lastMove, player } = getLastMove(board, columnNumber);

    if (!player) {
        // column is empty
        return 0;
    }

    // defined for ease
    let column = columnNumber;
    let row = lastMove;

    // Takes into account the move that was just made.
    let winCount = 1;
    // let winMoves = []
    // winMoves.push(String(column) + String(row));

    // Check up and to the right
    // console.log(`Checking up and to the right`);
    if (column > 0 && row > 0) {
        for (let index = column; index >= 0; index--) {
            // console.log(`Checking column ${index}, row ${row}...`);
            if (row >= 0) {
                if (board[index][row] === player) {
                    // Account for duplicates
                    if (index !== column && row !== lastMove) {
                        winCount++;
                        // winMoves.push(String(index) + String(row));
                    }
                } else {
                    break;
                }
            } else {
                // I've hit the top of the board
                break;
            }
            row -= 1;
        }
    }

    row = lastMove;
    // Check down and to the left
    // console.log(`Checking down and to the left`);
    if (column < 6 && row < 5) {
        for (let index = column; index <= 6; index++) {
            // console.log(`Checking column ${index}, row ${row}...`);
            if (row <= 5) {
                if (board[index][row] === player) {
                    // Account for duplicates
                    if (index !== column && row !== lastMove) {
                        winCount++;
                        // winMoves.push(String(index) + String(row));
                    }
                } else {
                    break;
                }
            } else {
                // I've hit the bottom....
                break;
            }
            row += 1;
        }
    }

    return winCount;
}

export function getLastMove(board, columnNumber) {
    let lastMove = getAvailableSpot(board[columnNumber]) + 1;
    let player = board[columnNumber][lastMove];

    if (player === '0') {
        return { lastMove: false, player: false };
    }
    return { lastMove, player };
}

export function makeMove(inBoard, columnNumber, player) {
    // Takes the player number, and puts their number in the next open field in the column provided.
    // Returns the board. If invalid, returns false.
    let board = [...inBoard];
    if (isColumnOpen(board[columnNumber])) {
        let spot = getAvailableSpot(board[columnNumber]);
        let before = board[columnNumber].slice(0, spot);
        let after = board[columnNumber].slice(spot + 1);
        let newColumn = before + player + after;
        board[columnNumber] = newColumn;
        return board;
    } else {
        return false;
    }
}

export function isColumnOpen(columnArray) {
    // Takes in a columnArray array. If it's full, returns false, if not, returns true.
    if (columnArray[0] === '0') {
        return true;
    } else {
        return false;
    }
}

export function getAvailableSpot(columnArray) {
    // Takes in a columnArray array and returns the next available row to use. If no spots available, return -1
    let row = -1
    for (let index = 5; index >= 0; index--) {
        if (columnArray[index] === '0') {
            row = index;
            return row;
        }
    }
    return row;
}

export function checkFullBoard(board) {
    if (!isColumnOpen(board[0]) &&
        !isColumnOpen(board[1]) &&
        !isColumnOpen(board[2]) &&
        !isColumnOpen(board[3]) &&
        !isColumnOpen(board[4]) &&
        !isColumnOpen(board[5]) &&
        !isColumnOpen(board[6])) {
            return true;
    } else {
        return false;
    }
}

export function getSurroundingTokenCount(board, columnNumber) {
    const { lastMove, player } = getLastMove(board, columnNumber);
    let tokenCount = 0;
    /*
        If column is > 0, check column - 1
        If column < 6, check column + 1
        If lastMove > 0, check lastMove - 1
        If lastMove < 5, check lastMove + 1
    */
   for (let col = columnNumber - 1; col <= columnNumber + 1; col++) {
       for (let row = lastMove - 1; row <= lastMove + 1; row++) {
           if (col >= 0 && col <= 6) {
               if (row >= 0 && row <=5) {
                 if (board[col][row] === player) {
                     tokenCount++;
                 }
               }
           }
       }
   }
   tokenCount--; // Remove one for current move
   return tokenCount;
}

function displayBoard(board) {
    // Used to console log the board correctly.
    let row;
    for (let rowNum = 0; rowNum < 6; rowNum++) {
        row = '';
        for (let colNum = 6; colNum >= 0; colNum--) {
            row += board[colNum][rowNum];
        }
    console.log(row);
    }  
}

// module.exports = {
//     checkWinner,
//     checkFullBoard,
//     makeMove
// }