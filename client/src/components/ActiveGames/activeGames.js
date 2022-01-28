import React from 'react';
import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { JOIN_GAME} from "../utils/mutations"
import { QUERY_GAMES} from "../utils/queries"
import { useParams} from 'react-router-dom';



const ActiveGames = () => {

    const {username: userParam} = useParams()

    const { loading , data} = useQuery(QUERY_GAMES)
    const games = data?.games

    if(!games.length) {
        return <h2> You're not actively in any games</h2>
    }

    const activeGames = games.filter( game => {game.player1 === username || game.player2 === username}
    


 return (
    <section>
        <div>
            { activeGames.map(game => (
                <div className="activeGame">
                    
                </div>

            )) }
            
        </div>
    </section>
 )
}

export default ActiveGames;