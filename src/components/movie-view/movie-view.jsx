import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
                <Card className="movie-view-card h-100 shadow-md custom-card-border">
                    <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
                    <Card.Body>
                        <Card.Title className="display-6"><strong>{movie.title}</strong></Card.Title>
                        <Card.Text className="mb-1 text-muted">
                            <strong>Release Date: </strong>
                            {new Date(movie.releaseDate).toLocaleDateString()}
                        </Card.Text>
                        <br />
                        <Card.Text>
                            <strong>Summary: </strong>{movie.summary}
                        </Card.Text>

                        <hr />

                        <div className="mb-2">
                            <strong>Genre: </strong>
                            <span>
                                {movie.genres?.map((g) => g.genreName).join(', ') || 'N/A'}
                            </span>
                        </div>

                        <div className="mb-2">
                            <strong>Director: </strong>
                            <span>
                                {movie.directors?.map((d) => d.directorName).join(', ') || 'N/A'}
                            </span>
                        </div>

                        <div className="mb-4">
                            <strong>Cast: </strong>
                            <span>
                                {movie.cast?.map((c) => c.castName).join(', ') || 'N/A'}
                            </span>
                        </div>
                        <br />

                        <Button
                            variant="primary"
                            onClick={onBackClick}   
                            className="back-button w-100"
                            style={{ cursor: "pointer "}}
                        >
                            Back to Movie List
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imagePath: PropTypes.string,
        summary: PropTypes.string.isRequired,
        directors: PropTypes.arrayOf(PropTypes.shape({
            directorName: PropTypes.string.isRequired
        })).isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            genreName: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,    
    onBackClick: PropTypes.func.isRequired,
};