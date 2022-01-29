import React from "react";
// import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../../utils/queries";
import { JOIN_GAME } from "../../utils/mutations";
import "./OpenGames.css";

const OpenGames = () => {
  const { gameData } = useQuery(QUERY_GAMES);
  const games = gameData?.games || [];

  const openGames = games.filter((game) => {
    return game.player2 === "Empty";
  });

  const [joinGame] = useMutation(JOIN_GAME);

  if (!openGames.length) {
    return <h2>There are no open games! Consider making one!</h2>;
  }

  const handleJoinGame = (event, gameId) => {
    event.preventDefault();

    try {
      joinGame({
        variables: {
          id: gameId,
        },
      });

      window.location.assign("/game/" + gameId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <div className="openGames__card-container">
        {openGames.map((game) => (
          <div className="openGames__card">
            <button
              onClick={handleJoinGame(game.id)}
              className="activeGames__card-title"
            >
              {game.player1}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpenGames;
