import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ user, token, setUser }) => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies);
    const movie = movies.find((m) => m._id === movieId);

    if (!user) return <div>Loading user data...</div>
    if (!movie) return <div>Movie not found in database</div>;

    const isFavorite = user.favoriteMovies && user.favoriteMovies.includes(movie._id);

    const toggleFavorite = () => {
        const method = isFavorite ? "DELETE" : "POST";
        
        fetch(`${API_URL}/users/${user.username}/movies/${movie._id}`, {
            method: method,
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(updatedUser => setUser(updatedUser))
        .catch(error => console.error(error));
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
                <Card className="movie-view-card h-100 shadow-md custom-card-border">
                    <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                            <Card.Title className="display-6"><strong>{movie.title}</strong></Card.Title>
                            <Button variant={isFavorite ? "danger" : "outline-danger"} onClick={toggleFavorite}>
                                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        </div>
                        
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

                        <Link to={`/`}>
                            <button 
                                variant="primary"   
                                className="back-button w-100"
                                style={{ cursor: "pointer "}}>
                                Back to List
                            </button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

MovieView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        birthDate: PropTypes.string
    }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
};