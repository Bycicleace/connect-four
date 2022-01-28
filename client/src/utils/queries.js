import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      wins
      games {
        _id
        player1
        player2
        playerTurn
        board
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      wins
      games {
        _id
        player1
        player2
        playerTurn
        board
      }
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
      playerTurn
      board
    }
  }
`;
