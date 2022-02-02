import React from "react";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useParams } from "react-router-dom";
import { QUERY_GAME } from "../../utils/queries";
import { UPDATE_BOARD } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
// import { useState } from "react";
import Auth from "../../utils/auth";
import "./Game.css";
import { checkWinner, checkFullBoard, makeMove } from "../../utils/game_functions.js";

const Game = () => {
  const params = useParams();
  const { loading, data } = useQuery(QUERY_GAME, {
      variables: { id:params.gameId }
  })
  const [ updateBoard, { error } ] = useMutation(UPDATE_BOARD);
  // const [board, setBoard] = useState(data?.game?.board);
  const currentProfile = Auth.getProfile();
  // console.log(currentProfile);

  if (loading) {
      return (
          <div>Loading....</div>
      );
  };
  
  const board = data?.game?.board;
  const currentPlayerNumber = data?.game?.playerTurn;
  let nextTurn = 0;
  let isWon = checkWinner(board, 0) ||
              checkWinner(board, 1) ||
              checkWinner(board, 2) ||
              checkWinner(board, 3) ||
              checkWinner(board, 4) ||
              checkWinner(board, 5) ||
              checkWinner(board, 6);
  let isCatsGame = checkFullBoard(board);
  if (isCatsGame) {
    isWon = true;
  }
  // console.log("Cat's: " + isCatsGame, "Won: " + isWon);
  let currentPlayerName = '';
  let isMyTurn = false;

  if (currentPlayerNumber === 1) {
    currentPlayerName = data?.game?.player1
    nextTurn = 2;
  } else if (currentPlayerNumber === 2) {
    if (data?.game?.player2 === 'Empty') {
      currentPlayerName = "Opponent";
      nextTurn = 2;
    } else {
      currentPlayerName = data?.game?.player2
      nextTurn = 1;
    }
  } else {
    currentPlayerName = '';
  }

  if (!isWon && (currentPlayerName === currentProfile.data.username)) {
    isMyTurn = true;
  } else {
    isMyTurn = false;
  }
  // console.log(isMyTurn);

  async function chooseColumn(colNumber) {
    const newBoard = makeMove(board, colNumber, currentPlayerNumber);
    if (checkWinner(newBoard, colNumber)) {
      nextTurn = currentPlayerNumber;
      isWon = true;
    }
    if (checkFullBoard(board) && !isWon) {
      isCatsGame = true;
      isWon = true;
      nextTurn = currentPlayerNumber;
    }
    // setBoard(newBoard);
    try {
      await updateBoard({
        variables: {
          id: params.gameId,
          board: newBoard,
          playerTurn: nextTurn
        }
      });

      if (error) {
        console.log("CALL ERROR: " + error);
      }
    } catch (e) {
      console.log("ERROR: " + e);
      console.log(error);
    }
    // isWon = checkWinner(newBoard, colNumber);
  }
  // console.log(board, currentPlayerNumber, currentPlayerName, nextTurn);

  return (
    <div>
      <section className="game__header">
          <h1>{isWon ? (isCatsGame ? `Cat's Game!` : `${currentPlayerName} Wins!`) : `Player Turn: ${currentPlayerName}`}</h1>
          {isMyTurn ? (
            <h2>Choose your Column:</h2>
          ) : (
            <></>
          )}
          <div className="game__moves">
            <button id="col6" onClick={() => chooseColumn(6)} disabled={isWon || !isMyTurn}></button>
            <button id="col5" onClick={() => chooseColumn(5)} disabled={isWon || !isMyTurn}></button>
            <button id="col4" onClick={() => chooseColumn(4)} disabled={isWon || !isMyTurn}></button>
            <button id="col3" onClick={() => chooseColumn(3)} disabled={isWon || !isMyTurn}></button>
            <button id="col2" onClick={() => chooseColumn(2)} disabled={isWon || !isMyTurn}></button>
            <button id="col1" onClick={() => chooseColumn(1)} disabled={isWon || !isMyTurn}></button>
            <button id="col0" onClick={() => chooseColumn(0)} disabled={isWon || !isMyTurn}></button>
          </div>
      </section>
      <section className="game__container">
        <GameBoard params={board} />
      </section>
    </div>
  );
};

export default Game;
