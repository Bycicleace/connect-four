import React from 'react';
import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { JOIN_GAME} from "../utils/mutations"
import { QUERY_GAMES} from "../utils/queries"


const ActiveGames = () => {

    const { loading , data} = useQuery(QUERY_GAMES)
    const joinGame = useMutation(JOIN_GAME)
    const games = data?.games

    if(!games.length) {
        return <h2> You're not actively in any games</h2>
    }
    


 return (
    <Container>
        <CardColumns>
            <Card>
                <Card.Body>

                </Card.Body>
            </Card>
        </CardColumns>
    </Container>
 )
}

export default ActiveGames;