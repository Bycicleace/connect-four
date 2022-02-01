import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GAMES, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import UserBio from "../../components/UserBio/UserBio";
import ActiveGames from "../../components/ActiveGames/ActiveGames";
import OpenGames from "../../components/OpenGames/OpenGames";
import YourOpenGames from "../../components/YourOpenGames/YourOpenGames";
import "./Profile.css";

function Profile() {
  const { data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  const userQuery = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });
  const user = userQuery.data?.user || {};

  const theOpenGames = games.filter((game) => {
    return game.player1 === user.username && game.player2 === "Empty";
  });
  const [openGames, setOpenGames] = useState(theOpenGames.length);

  console.log(user.username, games, openGames);

  return (
    <main className="profile__page">
      <UserBio setOpenGames={setOpenGames} openGames={openGames} />
      <ActiveGames games={games} />
      <YourOpenGames games={games} openGames={openGames} />
      <OpenGames games={games} />
    </main>
  );
}

export default Profile;
