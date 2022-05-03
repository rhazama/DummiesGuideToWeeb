import React from 'react';
import { 
    jumbotronStyle,
    Container,
    Col,
    Form,
    Button,
    Card,
    Column,
    Row,} from 'react-materialize';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_ANIME } from '../utils/mutations';
import { removeAnimeId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedAnimes = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeAnime, { error }] = useMutation(REMOVE_ANIME);

  const userData = data?.me || {};

  const handleDeleteAnime = async (animeId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeAnime({
        variables: { animeId },
      });

      removeAnimeId(animeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <jumbotronStyle fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s animes!</h1>
        </Container>
      </jumbotronStyle>
      <Container>
        <h2>
          {userData.savedAnimes?.length
            ? `Viewing ${userData.savedAnimes.length} saved ${
                userData.savedAnimes.length === 1 ? 'anime' : 'animes'
              }:`
            : 'You have no saved animes!'}
        </h2>
        <Row>
            <Col>
            {userData.savedAnimes?.map((anime) => {
             return (
                <Card key={anime.animeId} border="dark">
                    {anime.image ? (
                    <Card.Img
                        src={anime.image}
                        alt={`The cover for ${anime.title}`}
                        variant="top"
                    />
                    ) : null}
                    <Card.Body>
                    <Card.Title>{anime.title}</Card.Title>
                    <Card.Text>{anime.description}</Card.Text>
                    <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteAnime(anime.animeId)}
                    >
                        Delete this Anime!
                    </Button>
                    </Card.Body>
                </Card>
                );
            })}
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default SavedAnimes;


