import React from 'react';
import userBio from '../../components/UserBio';
import activeGames from '../../components/ActiveGames';
import openGames from '../../components/OpenGames';

return (
    <main className="profile_page">
<userBio />
<activeGames />
<openGames />
    </main>
);

export default Profile;