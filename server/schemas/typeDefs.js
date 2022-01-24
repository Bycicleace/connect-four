const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID!
        player1: String
        player2: String
        playerTurn: Int
        board: [String]
    }

    type User {
        _id: ID
        username: String
        email: String
        wins: Int
        games: [Game]
    }

    type Query {
        users: [User]
        games: [Game]
        game(_id: ID!): Game
    }

    type Mutation {
        addGame(player1: String, player2: String): Game
    }
`;

module.exports = typeDefs;