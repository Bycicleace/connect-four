import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import "./YourOpenGames.css";
import Auth from "../../utils/auth";

const YourOpenGames = (props) => {
    const { games, openGames } = props;
    // const { data } = useQuery(QUERY_USER, {
    //     variables: { id: Auth.getProfile().data._id },
    // });
    // const user = data?.user || {};

    // const yourOpenGames = games.filter((game) => {
    //     return game.player1 === user.username && game.player2 === "Empty";
    // });

    if (!openGames) {
        return (
            <div className="yourOpenGames__container">
                <h2 className="yourOpenGames__header">
                    Games Awaiting Opponent:
                </h2>
                <h3 className="yourOpenGames__sub-title">
                    You dont have any games for others to join!
                </h3>
            </div>
        )
    }
    else {
        return (
            <div className="yourOpenGames__container">
                <h2 className="yourOpenGames__header">
                    Games Awaiting Opponent:
                </h2>
                <h3 className="yourOpenGames__text">
                    {openGames}
                </h3>
            </div>
        )
    }
}
export default YourOpenGames;
