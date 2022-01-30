import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import "./YourOpenGames.css";
import Auth from "../../utils/auth";

const YourOpenGames = (props) => {
    const games = props.games || [];

    console.log(games);
    const { data } = useQuery(QUERY_USER, {
        variables: { id: Auth.getProfile().data._id },
    });
    const user = data?.user || {};

    const yourOpenGames = games.filter((game) => {
        return game.player1 === user.username && game.player2 === "Empty";
    })
    if (!yourOpenGames.length) {
        return <h2>You Dont have any games for others to join!</h2>;
      }
    return (
        <section>
            <h1>You have {yourOpenGames.length} game(s) open!</h1>
        </section >
    )
}
export default YourOpenGames;
