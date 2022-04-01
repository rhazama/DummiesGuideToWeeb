const { Schema } = require('mongoose');

const animeSchema = new Schema({
    animeTitle: [
        {type: String,},
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
        type: string,
    },
    link: {
        type: String,
        required: true,
    },
});

module.exports + animeSchema;