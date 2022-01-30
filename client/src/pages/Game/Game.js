import React from "react";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useParams } from "react-router-dom";
import { QUERY_GAME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./Game.css";

const Game = () => {
  const params = useParams();
  const { loading, data } = useQuery(QUERY_GAME, {
      variables: { id:params.gameId}
  })

  if (loading) {
      return (
          <div>Loading....</div>
      );
  };
  
  const board = data?.game?.board;


  return (
    <section className="game__container">
      <GameBoard params={board} />
    </section>
  );
};

export default Game;
