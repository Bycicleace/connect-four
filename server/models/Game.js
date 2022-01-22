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
            // The board is set up as an array of arrays.
            // The enveloping array allows us to call on
            // individual columns. eg: board[3] would select
            // the 4th column. baord[3][2] would select the
            // third element of the 4th column. We can use
            // '1' for player1 tokens and '2' for player2
            // tokens
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