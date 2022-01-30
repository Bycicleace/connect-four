import React from "react";
// import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import {  QUERY_USER } from "../../utils/queries";
import { JOIN_GAME } from "../../utils/mutations";
import "./OpenGames.css";
import Auth from "../../utils/auth";

const OpenGames = (props) => {
  const games = props.games || [];
  const { data } = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });

  const user = data?.user || {};
console.log(games);
  const openGames = games.filter((game) => {
    return game.player2 === "Empty" && game.player1 !== user.username;
  });

  const [joinGame] = useMutation(JOIN_GAME);

  if (!openGames.length) {
    return (
      <section className="openGames__container">
        <h1 className="openGames__title">
          There are no open games!
        </h1>
        <h2 className="openGames__sub-title">
          Consider making one!
        </h2>
      </section>
    )
  };

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
    <section className="openGames__container">

      <h1 className="openGames__header">Join a Game!</h1>
      <div className="openGames__card-container">
        {openGames.map((game) => (
          <div className="openGames__card">
            <button
              onClick={(e)=> handleJoinGame(e, game._id)}
              className="openGames__card-title"
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
