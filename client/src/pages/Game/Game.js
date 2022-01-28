import React from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import { useParams } from 'react-router-dom';


const Game = () => {
    const gameId = useParams();
    return (
        <section className='game__container'>
            <GameBoard params={gameId}/>
        </section>
    );
};

export default Game;