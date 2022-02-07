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
         getSurroundingTokenCount } from "./game_functions";


export function rankMoves(board, columnNumber, player) {
    if (checkFullBoard(board) === true) {
        return [-1,-1,-1,-1,-1,-1,-1];
    }
    let rankedMoves = [0,0,0,0,0,0,0];
    let opponent = 0;
    if (player === 1) {
        opponent = 2;
    } else if (player === 2) {
        opponent = 1;
    } else {
        opponent = 0;
    }
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
            tempBoard = makeMove(board, i, player);
            if (isColumnOpen(tempBoard[i])) {
                if (isNextMoveWin(board, i, opponent)) {
                    rankedMoves[i] = 0;
                }
            }

            // >> Scoring Logic here
        } else {
            // -1 means the column is closed
            rankedMoves[i] = -1;
        }
    }
    return rankedMoves;
}

export function isNextMoveWin(board, columnNumber, player) {
    return checkWinner(makeMove(board,columnNumber, player), columnNumber);
};