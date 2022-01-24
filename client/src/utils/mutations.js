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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
