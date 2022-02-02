import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GAMES, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import UserBio from "../../components/UserBio/UserBio";
import ActiveGames from "../../components/ActiveGames/ActiveGames";
import OpenGames from "../../components/OpenGames/OpenGames";
import YourOpenGames from "../../components/YourOpenGames/YourOpenGames";
import "./Profile.css";

function Profile() {
  const { data, loading } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  const userData = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });

  const user = userData.data?.user || {};
  
  const myOpenGames = games.filter((game) => {
    return game.player2 === "Empty" && game.player1 === user.username;
  });

  console.log(myOpenGames.length);
  const temp = myOpenGames.length
  const [ openGames, setOpenGames ] = useState(0);

  useEffect(() => {
    if (!loading) {
      setOpenGames(temp);
    }
  }, [temp])

  return (
    <main className="profile__page">
      <UserBio openGames={openGames} setOpenGames={setOpenGames} />
      <ActiveGames games={games} />
      <YourOpenGames openGames={openGames} />
      <OpenGames games={games} />
    </main>
  );
}

export default Profile;
