import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../../utils/queries';
import UserBio from "../../components/UserBio/UserBio";
import ActiveGames from "../../components/ActiveGames/ActiveGames";
import OpenGames from "../../components/OpenGames/OpenGames";
import "./Profile.css";

function Profile() {
  const { data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];
  console.log(games);

  return (
    <main className="profile_page">
      <UserBio />
      <ActiveGames games={games} />
      <OpenGames games={games} />
    </main>
  );
}

export default Profile;
