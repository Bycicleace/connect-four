import React from "react";
import { Link } from "react-router-dom";
// import { Container, Card, CardColumns } from 'react-bootstrap';
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_GAMES } from "../../utils/queries";
import Auth from "../../utils/auth";

const ActiveGames = () => {
  const { userData } = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });
  const user = userData?.user || {};

  const { gameData } = useQuery(QUERY_GAMES);
  const games = gameData?.games || [];

  const activeGames = games.filter((game) => {
    return game.player1 === user.username || game.player2 === user.username;
  });

  if (!activeGames.length) {
    return <h2>You're not actively in any games</h2>;
  }

  return (
    <section>
      <div className="activeGames__card-container">
        {activeGames.map((game) => (
          <div className="activeGames__card">
            <Link to={`/game/` + game.id} className="activeGames__card-title">
              {user.username === game.player1 ? game.player2 : game.player1}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveGames;