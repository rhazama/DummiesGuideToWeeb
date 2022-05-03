import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedAnimes {
        animeId
        title
        authors
        image
        description
        link
      }
    }
  }
`;