import React from "react";
import { Link } from "react-router-dom";
// import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_GAMES } from "../utils/queries";
import { JOIN_GAME } from "../utils/mutations";

const ActiveGames = () => {
  const { username: userParam } = useParams();
  const { loading, userData } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });
  const user = userData?.user || {};

  const { loading, gameData } = useQuery(QUERY_GAMES);
  const games = gameData?.games;

  const openGames = games.filter((game) => {
    game.player2 === "Empty";
  });

  const [joinGame] = useMutation(JOIN_GAME);

  if (!openGames.length) {
    return <h2>There are no open games! Consider making one!</h2>;
  }

  const handleJoinGame = (event, gameId) => {
    event.preventDefault();

    try {
      await joinGame({
        variables: {
          id: gameId,
        },
      });

      window.location.assign('/game/' + gameId);
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