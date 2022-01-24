import { gql } from '@apollo/client';

export const ADD_GAME = gql`
  mutation addGame($player1: String, $player2: String) {
    addGame(player1: $player1, player2: $player2) {
        _id
        player1
        player2
        playerTurn
        board
    }
  }
`;