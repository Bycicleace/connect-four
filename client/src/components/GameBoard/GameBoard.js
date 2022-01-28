import React from 'react';
import { useQuery } from 'react-router-dom';
import { QUERY_GAME } from '../../utils/queries';

function GameBoard(props) {
    const { gameId } = props;
    const { loading, data } = useQuery(QUERY_GAME, {
        variables: { id: gameId }
    });
    const board = data.game.board;

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className='gameBoard__container'>

        </div>
    );
};

export default GameBoard;