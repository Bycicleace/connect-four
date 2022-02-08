import { gql } from '@apollo/client';

export const ADD_GAME = gql`
  mutation addGame {
    addGame {
      _id
      player1
      player2
      isFull
      hasComputer
      playerTurn
      board
    }
  }
`;

export const JOIN_GAME = gql`
  mutation joinGame($id: ID!) {
    joinGame(gameId: $id) {
      _id
      player1
      player2
      playerTurn
      board
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard($id: ID!, $board: [String]!, $playerTurn: Int!) {
    updateBoard(gameId: $id, gameBoard: $board, playerTurn: $playerTurn) {
      _id
      player1
      player2
      playerTurn
      board
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

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
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

