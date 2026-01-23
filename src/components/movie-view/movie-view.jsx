import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Card, Col, Row, Button } from "react-bootstrap";
import { API_URL } from "../../config";
import "./movie-view.scss";

export const MovieView = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    const { authFetch, user } = useApi();
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    if (!movie) return <div>Movie not found in database</div>;

    const isFavorite = user?.favoriteMovies?.includes(movie._id);
    
    const toggleFavorite = async () => {
        const method = isFavorite ? "DELETE" : "POST";
        const url = `${API_URL}/users/${user.username}/movies/${movie._id}`;
        const response = await authFetch(url, { method});

        if (response && response.ok) {
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
            dispatch(setUser(updatedUser));
        }
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
                <Card className="movie-view-card h-100 shadow-md custom-card-border">
                    <Card.Img variant="top" src={movie.imagePath} className="img-fluid rounded-start" alt={movie.title} />
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <Card.Title className="display-6"><strong>{movie.title}</strong></Card.Title>
                            <Button variant={isFavorite ? "danger" : "outline-danger"} onClick={toggleFavorite}>
                                {isFavorite ? "Unfavorite" : "Favorite"}
                            </Button>
                        </div>
                        
                        <Card.Text className="mb-1 text-muted">
                            <strong>Release Date: </strong>
                            {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                        </Card.Text>

                        <br />

                        <Card.Text>
                            <strong>Summary: </strong>{movie.summary}
                        </Card.Text>

                        <hr />

                        <div className="mb-2">
                            <strong>Genre(s): </strong>
                            <span>
                                {movie.genres?.map((g) => g.genreName).join(', ') || 'N/A'}
                            </span>
                        </div>

                        <div className="mb-2">
                            <strong>Director(s): </strong>
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

                        <Link to="/" className="w-100" onClick={() => dispatch(setFilter(""))}>
                            <Button variant="primary" className="w-100 mt-3">
                                Back to List
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};
