/*
Easy AI:
	create an array of open columns.
	select a random index.
	Play there.

Medium AI:
	Look 1 move ahead and make move based off of that

Hard AI:
	Look 2 moves ahead and make move based off of that

Expert AI:
	Look 3 moves ahead and make move based off of that


Some Rules:
	1. If there is a spot in which I don't move and opponent wins, I must make a move there
	2. If there is a spot in which I will win if I move there, I must make a move there.
	3. If there are two in a row and two open ends, both of which are playable, then I must cap one of the ends.

Easy AI
    Pick Random column

Medium - Expert AI (iterate over for higher level)
If next move is a win
    set to 100
else If next move blocks opponents winning move
    set to 100
else if move results in a loss
    set to 0
else
    if next to token of same type
        add 10
    if adding to a chain
        add 15
    if blocking a chain of 2
        add 25

for each column that is open, run a makeMove on each column, and then getLastMove to get the cell of the last move.
Pass board, column, and computer player into checkWinner. If true, return 100.
Pass board, column, and opponent into checkWinner. If true, return 100.
makeMove for opponent, then run checkWinner for opponent. If true, then return 0.
set a temp Value to 0.
Get surrounding token count. Multiply by 10 and add to value
For each computer chain >= 2, add 15
For each opponent chain >= 2, add 25


*/

import { checkFullBoard,
         checkWinner,
         makeMove,
         isColumnOpen,
         getSurroundingTokenCount,
         getVerticalWinCount,
         getHorizontalWinCount,
         getDiagonalWinLeftCount,
         getDiagonalWinRightCount } from "./game_functions";


export function rankMoves(board, player) {
    // If the board is full, no valid moves
    if (checkFullBoard(board) === true) {
        return [-1,-1,-1,-1,-1,-1,-1];
    }

    let rankedMoves = [0,0,0,0,0,0,0];
    let opponent = 0;

    // Get opponent number
    if (player === 1) {
        opponent = 2;
    } else if (player === 2) {
        opponent = 1;
    } else {
        opponent = 0;
    }

    // Check each move for various things
    for (let i = 0; i <= 6; i++) {
        if (isColumnOpen(board[i])) {
            // Check win for me!
            if (isNextMoveWin(board, i, player)) {
                // This move takes priority above all. set and return
                rankedMoves = [0,0,0,0,0,0,0];
                rankedMoves[i] = 100;
                return rankedMoves;
            }

            // Check win for you!
            if (isNextMoveWin(board, i, opponent)) {
                // This move takes priority after no win. reset array, and return move
                rankedMoves = [0,0,0,0,0,0,0];
                rankedMoves[i] = 100;
                return rankedMoves;
            }

            // Move following mine is results in a loss
            movedBoard = makeMove(board, i, player);
            if (isColumnOpen(movedBoard[i])) {
                if (isNextMoveWin(movedboard, i, opponent)) {
                    rankedMoves[i] = 0;
                    continue;
                }
            } else {
               // >> Scoring Logic here
                let score = 0;
                // + 10 for each adjacent similar token
                score = score + (10 * getSurroundingTokenCount(movedBoard, i));

                // + 15 for adding to a chain (Use checkX functions)
                let verticalCount = getVerticalWinCount(movedBoard, i);
                if (verticalCount > 2) {
                    console.log("Vertical Count: " + String(verticalCount), "Column: " + String(i));
                }
                let horizontalCount = getHorizontalWinCount(movedBoard, i);
                let diagonalLeftCount = getDiagonalWinLeftCount(movedBoard, i);
                let diagonalRightCount = getDiagonalWinRightCount(movedBoard, i);

                // for each chain with 2 or more existing tokens, add 15.
                score = score + (verticalCount > 2 ? 15 : 0);
                score = score + (horizontalCount > 2 ? 15 : 0);
                score = score + (diagonalLeftCount > 2 ? 15 : 0);
                score = score + (diagonalRightCount > 2 ? 15 : 0);

                // + 25 for blocking an opponent chain (Use checkX functions)
                verticalCount = getVerticalWinCount(makeMove(board, i, opponent), i);
                horizontalCount = getHorizontalWinCount(makeMove(board, i, opponent), i);
                diagonalLeftCount = getDiagonalWinLeftCount(makeMove(board, i, opponent), i);
                diagonalRightCount = getDiagonalWinRightCount(makeMove(board, i, opponent), i);

                // for each chain with 2 or more existing tokens for my opponent, add 25
                score = score + (verticalCount > 2 ? 25 : 0);
                score = score + (horizontalCount > 2 ? 25 : 0);
                score = score + (diagonalLeftCount > 2 ? 25 : 0);
                score = score + (diagonalRightCount > 2 ? 25 : 0);

                rankedMoves[i] = score; 
            }
        } else {
            // -1 means the column is closed
            rankedMoves[i] = -1;
        }
    }

    // Array of scored moves returned
    // console.log("Ranked Moves array: " + String([...rankedMoves].reverse()));
    return rankedMoves;
}

export function isNextMoveWin(board, columnNumber, player) {
    return checkWinner(makeMove(board,columnNumber, player), columnNumber);
};

export function getComputerMove(rankedMoves) {
    // Get highest value from rankedMoves
    const highestValue = Math.max(...rankedMoves);
    // console.log("rankedMoves: " + String(rankedMoves));
    // console.log("Highest Value: " + String(highestValue));

    // Get all indicies that house that value
    let moves = [];
    for (let i = 0; i < rankedMoves.length; i++) {
        if (rankedMoves[i] === highestValue) {
            // console.log("HV hit: " + String(rankedMoves[i]));
            moves.push(i);
        }
    }

    // console.log("Moves: " + String(moves));

    // Generate a random selection from array
    const selection = Math.floor((Math.random() * moves.length));
    // console.log("Selection: " + String(moves[selection]));
    return moves[selection];
}

export function makeComputerMove(board, player) {
    const moves = rankMoves(board, player);
    const compMove = getComputerMove(moves);
    const newComputerBoard = makeMove(board, compMove, player);
    return { newComputerBoard, compMove };
}

export function makePlayerMove(board, columnNumber, player) {
    const newPlayerBoard = makeMove(board, columnNumber, player);
    // displayBoard(newPlayerBoard);
    
    let computerPlayer = 0;
    if (player === 1) {
        computerPlayer = 2;
    } else if (player === 2) {
        computerPlayer = 1;
    } else {
        computerPlayer = 0;
    }

    if (checkWinner(newPlayerBoard, columnNumber)) {
        console.log("You win!");
        return newPlayerBoard;
    } else if (checkFullBoard(newPlayerBoard)) {
        console.log("Cat's game!");
        return newPlayerBoard;
    }

    const { newComputerBoard, compMove } = makeComputerMove(newPlayerBoard, computerPlayer);
    if (checkWinner(newComputerBoard, compMove)) {
        console.log("I win!");
    } else if (checkFullBoard(newComputerBoard)) {
        console.log("It's a tie!");
    }
    // displayBoard(newComputerBoard);
    return newComputerBoard;
}