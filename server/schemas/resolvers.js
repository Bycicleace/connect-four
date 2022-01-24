const { User, Game } = require('../models');
// const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        game: async (parent, { gameId }) => {
            return Game.findOne(gameId);
        }
    },

    Mutation: {
        addGame: async (parent, args) => {
            const game = await Game.create(args);

            return game;
        }
    }
};

module.exports = resolvers;