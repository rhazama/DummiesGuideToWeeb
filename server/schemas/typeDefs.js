const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        animeCount: Int!
        savedAnime: [anime]
    }
    type Anime {
        animeId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    input AnimeInput {
        authors: [String]
        description: String!
        animeId: String!
        image: String
        link: String
        title: String!
    }
    type: Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, passwrod: String!): Auth
        saveAnime(animeData: BookInput!): User
        removeAnime(animeId: ID!): User
    }
    `;

module.exports = typeDefs;