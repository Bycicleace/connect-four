const { User, Game } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    game: async (parent, { gameId }) => {
      return Game.findOne(gameId);
    },
    user: async (parent, { username }) => {
      return User.findOne(username);
    },
  },

  Mutation: {
    // resolver for adding a game
    addGame: async (parent, context) => {
      console.log(context.user);
      if (context.user) {
        const game = new Game(context.user.username);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { games: game },
        });

        return game;
      }

      throw new AuthenticationError("Not Logged In!");
    },
    joinGame: async (parent, { _id }, context) => {
      console.log(context.user);
      if (context.user) {
        const game = await Game.findByIdAndUpdate(_id, {
          $set: { player2: context.user.username },
        });
        return await User.findByIdAndUpdate(
          context.user._id,
          { $push: { games: game } },
          { new: true }
        );
      }
    },
    // resolver for adding a user and returning user and signed JWT
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    // resolver for logging in user and returning user and signed JWT
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
