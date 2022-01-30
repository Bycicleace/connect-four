import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./ActiveGames.css";

const ActiveGames = (props) => {
  const { data } = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });
  const user = data?.user || {};

  const games = props.games;

  const activeGames = games.filter((game) => {
    return (game.player1 === user.username && game.player2 != "Empty") || game.player2 === user.username;
  });

  if (!activeGames.length) {
    return (
    
      <section className="openGames__container">
        <h1 className="openGames__title">
          Active Games:
        </h1>
        <h2 className="openGames__sub-title">
          You're not actively in any games
        </h2>
      </section>
    )
  }

  return (
    <section className="activeGames__container">
      <h1 className="activeGames__header">Current Active Games:</h1>
      <div className="activeGames__card-container">
        {activeGames.map((game) => (
            <Link key={game._id} to={`/game/` + game._id} className="activeGames__card">
              {user.username === game.player1 ? game.player2 : game.player1}
            </Link>
        ))}
      </div>
    </section>
  );
};

export default ActiveGames;
