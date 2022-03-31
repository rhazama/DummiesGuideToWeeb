const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const animeSchema = require('./anime');

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: turw,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        savedAnime: [animeSchema],
    },
    {
        toJSON: {
            virtuals:true,
        },
    }
);

// has the user password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate the password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we get a query a user, we will also get another field called 'animeCount' with the number of save saved books we have
userSchema.virtual('animeCount').get(function () {
    return this.savedAnime.length;
});

const User = model('User', userSchema);

module.exports = User;