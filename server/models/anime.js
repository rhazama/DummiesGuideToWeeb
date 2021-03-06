const { Schema } = require('mongoose');

const animeSchema = new Schema({
    animeTitle: [
        {
        type: String,
        },
    ],
    description: {
        type: String, 
        required: true,
    },
    animeId: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports + animeSchema;