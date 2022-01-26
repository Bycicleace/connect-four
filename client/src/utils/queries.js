import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      games {
        _id
        player1
        player2 
    }
  }
`;

export const QUERY_GAMES = gql`
  query games {
    games {
      _id
      player1
      player2
      playerTurn
      board
  }
`;


export const QUERY_GAME = gql`
  query game($id: ID!) {
    game(_id: $id) {
      _id
      player1
      player2
      playerTurn
      board
  }
`;

