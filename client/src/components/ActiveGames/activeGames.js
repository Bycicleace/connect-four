import React from 'react';
import { Container, Card, CardColumns } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { JOIN_GAME} from "../utils/mutations"
import { QUERY_GAMES} from "../utils/queries"


const ActiveGames = () => {

    const { loading , data} = useQuery(QUERY_GAMES)
    const joinGame = useMutation(JOIN_GAME)
    const gameData = data?.games


 return (
    <Container>
        <CardColumns>
            <Card>

            </Card>
        </CardColumns>
    </Container>
 )
}

export default ActiveGames;