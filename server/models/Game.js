const { Schema, model } = require('mongoose');
const userSchema = require('./User');

const gameSchema = new Schema(
    {
        player1: {userSchema},
        player2: {userSchema},
        playerTurn: {
            type: Number,
            default: 1
        },
        board: {
            type: Array,
            default: [
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0,]
            ]
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// return which player's turn it is
// NOT SURE WE EVEN NEED THIS
userSchema.virtual('playerTurn').get(function() {
    if (this.playerTurn === 1) {
        return this.player1;
    }
    else {
        return this.player2;
    }
});

const Game = model('Game', gameSchema);

module.exports = User;