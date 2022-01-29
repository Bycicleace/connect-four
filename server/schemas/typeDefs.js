const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    player1: String!
    player2: String
    isFull: String
    playerTurn: Int
    board: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    wins: Int
    games: [String]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    games: [Game]
    game(_id: ID!): Game
  }

  type Mutation {
    addGame: Game
    joinGame(gameId: ID!): Game
    deleteGame(gameId: ID!): Game
    updateBoard(gameId: ID!, gameBoard: [String]!, playerTurn: Int!): Game
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(userId: ID!): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
