const { Schema, model } = require('mongoose');
// const userSchema = require('./User');

const gameSchema = new Schema(
    {
        // players 1 and 2 will reference individual userSchema
        // allowing player data to be available in the individual
        // game objects.
        player1: {
            type: String,
            default: "Empty"
            // type: Schema.Types.ObjectId,
            // ref: 'User'
        },
        player2: {
            type: String,
            default: "Empty"
            // type: Schema.Types.ObjectId,
            // ref: 'User'
        },
        // playerTurn will identify which player's turn it is
        // '1' for player1 and '2' for player2
        isFull: {
            type: Boolean,
            default: false
        },
        hasComputer: {
            type: Boolean,
            default: false
        },
        playerTurn: {
            type: Number,
            default: 2
        },
        board: {
            type: Array,
            //right side is bottom
            default: [
                "000000",
                "000000",
                "000000",
                "000000",
                "000000",
                "000000",
                "000000"
            ]
        }
    },
    {
        toJSON: {
            virtuals: false
        }
    }
);

// // return which player's turn it is
// // NOT SURE WE EVEN NEED THIS
// gameSchema.virtual('whosTurn').get(function() {
//     if (this.playerTurn === 1) {
//         return this.player1;
//     }
//     else {
//         return this.player2;
//     }
// });

const Game = model('Game', gameSchema);

module.exports = Game;