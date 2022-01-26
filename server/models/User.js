const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        games: [
            {
                type: Schema.Types.ObjectId,
                unique: false,
                ref: 'Game'
            }
        ],
        wins: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// set up middleware for password creation
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// virtual for games won???
userSchema.virtual('gamesWon').get(function() {
    return this.wins;
});

// virtual for active games???
userSchema.virtual('activeGames').get(function() {
    return this.games.length;
});

const User = model('User', userSchema);

module.exports = User;