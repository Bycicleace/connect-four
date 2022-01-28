import React from 'react';
import { useQuery } from 'react-router-dom';
import { QUERY_GAME } from '../../utils/queries';

function GameBoard(props) {
    // Get game ID from prop passing
    const { gameId } = props;

    // Get the board from the query
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
            {board.forEach(column => {
                <div className='gameBoard__column'>
                    {column.split('').forEach(field => {
                        <img id={`gameBoard__${column}${field}`} className='gameBoard__field' src={`../../assets/board/${field}.png`} />
                    })}
                </div>
            })}
        </div>
    );
};

export default GameBoard;