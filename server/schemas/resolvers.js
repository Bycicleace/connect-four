const { User, Game } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    game: async (parent, { _id }) => {
      return Game.findOne({ _id });
    },
    games: async (parent, args) => {
      return Game.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    users: async(parent, args)=> {
      return User.find()
    }
  },

  Mutation: {
    // resolver for adding a game
    addGame: async (parent, args, context) => {
      if (context.user) {
        const game = await Game.create({ player1: context.user.username });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { games: game._id },
        });

        return game;
      }

      throw new AuthenticationError("Not Logged In!");
    },
    joinGame: async (parent, { gameId }, context) => {
      console.log(context.user);

      if (context.user) {
        const game = await Game.findById({ _id: gameId });

        if (game.isFull === false) {
          const updatedGame = await Game.findByIdAndUpdate(
            { _id: gameId },
            { $set: {
                player2: context.user.username,
                isFull: true
              }
            },
            { new: true }
          );

          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { games: updatedGame._id } },
            { new: true }
          );

          return updatedGame;
        } else {
          console.log("Game is full!");
          return game;
        }
      }

      throw new AuthenticationError("Not Logged In!");
    },
    deleteGame: async (parent, { gameId }) => {
      return await Game.findByIdAndDelete({ _id: gameId });
    },
    updateBoard: async (parent, { gameId, gameBoard, playerTurn }, context) => {
      const game = await Game.findById({ _id: gameId });
      const currentUser = context.user.username;
      if (currentUser === game.player1 || currentUser === game.player2) {
        return await Game.findByIdAndUpdate(
          { _id: gameId },
          {
            $set: {
              board: gameBoard,
              playerTurn: playerTurn,
            },
          },
          { new: true }
        );
      }

      throw new AuthenticationError("Not a player of this game!");
    },
    // resolver for adding a user and returning user and signed JWT
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, { userId }) => {
      return await User.findByIdAndDelete({ _id: userId });
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
