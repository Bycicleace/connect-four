const { User, Game } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        game: async (parent, { gameId }) => {
            return Game.findOne(gameId);
        },
        user: async (parent, { username }) => {
            return User.findOne(username);
        }
    },

    Mutation: {
        addGame: async (parent, args) => {
            const game = await Game.create(args);

            return game;
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return user;
        }
    }
};

module.exports = resolvers;