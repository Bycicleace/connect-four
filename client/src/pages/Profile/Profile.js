import React from 'react';
import UserBio from '../../components/UserBio/UserBio';
import ActiveGames from '../../components/ActiveGames/ActiveGames';
import OpenGames from '../../components/OpenGames/OpenGames';

function Profile() {
    return (
        <main className="profile_page">
            <UserBio />
            <ActiveGames />
            {/* <OpenGames /> */}
        </main>
    );
}

export default Profile;