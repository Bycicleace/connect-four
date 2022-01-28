import React from 'react';
// import userBio from '../../components/userBio/';
import activeGames from '../../components/ActiveGames/ActiveGames';
import openGames from '../../components/OpenGames/OpenGames';

function Profile() {
    return (
        <main className="profile_page">
            <userBio />
            <activeGames />
            <openGames />
        </main>
    );
}

export default Profile;