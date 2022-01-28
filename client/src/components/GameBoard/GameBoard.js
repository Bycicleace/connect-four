import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAME } from '../../utils/queries';
const img0 = require('../../assets/board/0.png');
const img1 = require('../../assets/board/1.png');
const img2 = require('../../assets/board/2.png');

function GameBoard(props) {
    // Get game ID from prop passing
    const { params } = props;
    const gameId = params.gameId

    // Get the board from the query
    const { loading, data } = useQuery(QUERY_GAME, {
        variables: { id: gameId }
    });

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    const board = data.game.board;

    return (
        <div className='gameBoard__container'>
            {board.map(column => {
                return (
                    <div className='gameBoard__column'>
                        {column.split('').map(field => {
                            switch (field) {
                                case '0':
                                    return (<img className='gameBoard__field' src={img0} />)
                                case '1':
                                    return (<img className='gameBoard__field' src={img1} />)
                                case '2':
                                    return (<img className='gameBoard__field' src={img2} />)
                            }
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default GameBoard;