const { Schema, model } = require('mongoose');
const bcrypt = require('mongoose');

const animeSchema = require('./anime');

const userSchema = new Schema{
    {
        username:{
            type: String,
            required: true,
            unique: turw,
        },
        email:{
            type: String,
            required: true;
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
};



const User = model('User', userSchema);

module.exports = User;