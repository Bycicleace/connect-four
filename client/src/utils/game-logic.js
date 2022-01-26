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

function checkWinner(board, column = -1) {
    // Take in game and an optional column number (last column chosen). Then, if move is populated, check for 4 in a row based around that last move.
    // Otherwise, check the entire gameboard for a win.
    // column should be a number corresponding to the column (left to right 0 - 6) that the last move was made in.

    // There are four directions to check given a move. Up/Down, Left/Right, and the two diagonals.
}

function checkVerticalWin(board, column = -1) {
    // Check for win in columns. Column is the last column played (optional).
    // If win, return true, else false.
}

function checkHorizontalWin(board, column = -1) {
    // Check for win in rows. Column is the last column played (optional)
    // If win, return true, else false
}

function checkDiagonalWinLeft(board, column = -1) {
    // Check for win from upper left to lower right diagonal. Column is the last column played (optional)
    // If win, return true, else false
}

function checkDiagonalWinRight(board, column = -1) {
    // Check for win from upper right to lower left diagonal. Column is the last column played (optional)
    // If win, return true, else false.
}

function makeMove(board, columnNumber, player) {
    // Takes the player number, and puts their number in the next open field in the column provided.
    // Returns the board. If invalid, returns false.
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

function isColumnOpen(column) {
    // Takes in a column array. If it's full, returns false, if not, returns true.
    if (column[0] != '0') {
        return true;
    } else {
        return false;
    }
}

function getAvailableSpot(column) {
    // Takes in a column array and returns the next available row to use. If no spots available, return -1
    let row = -1
    for (let index = 5; index >= 0; index--) {
        if (column[index] === '0') {
            row = index;
            return row;
        }
    }
    return row;
}