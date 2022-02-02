import { gql } from "@apollo/client";
// does users need t take ID?
export const QUERY_USERS = gql`
  query users {
    user {
      _id
      username
      email
      wins
      games
  }
}`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      wins
      games
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
  }
`;

export const QUERY_GAME = gql`
  query game($id: ID!) {
    game(_id: $id) {
      _id
      player1
      player2
      isFull
      playerTurn
      board
    }
  }
`;
