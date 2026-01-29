import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Card, Col, Row, Button } from "react-bootstrap";
import { API_URL } from "../../config";

export const MovieView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movies = useSelector((state) => state.movies);
    const { authFetch, user } = useApi();
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    if (!movie) return <div>Movie not found in database</div>;

    const isFavorite = user?.favoriteMovies?.includes(movie._id);
    
    const toggleFavorite = async () => {
        const method = isFavorite ? "DELETE" : "POST";
        const url = `${API_URL}/users/${user.username}/movies/${movie._id}`;

        try {
            const response = await authFetch(url, { method });

            if (response && response.ok) {
                let updatedUser;

                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    updatedUser = await response.json();
                } else {
                    const currentFavorites = user.favoriteMovies || [];
                    const updatedFavorites = isFavorite
                        ? currentFavorites.filter((id) => id !== movie._id)
                        : [...currentFavorites, movie._id];
                    
                    updatedUser = { ...user, favoriteMovies: updatedFavorites };
                }

                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));

            } else {
                if (response && response.status === 401) {
                    navigate("/login");
                } else {
                alert("Failed to update favorites.");
                }
            }
        } catch (error) {
            console.error("Network or logic error:", error);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
                <Card className="movie-view-card h-100 shadow-md">
                    <Card.Img variant="top" src={movie.imagePath} className="img-fluid rounded-start" alt={movie.title} />
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <Card.Title className="display-6 mb-0"><strong>{movie.title}</strong></Card.Title>
                            <Button
                                variant="link"
                                onClick={toggleFavorite}
                                className="glass-heart-button rounded-circle shadow-sm text-decoration-none"
                                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            >
                                <i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart text-dark"}`}></i>
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

                        <Button 
                            onClick={() => {
                                dispatch(setFilter(""));
                                navigate(-1);
                            }}
                            className="back-button rounded-pill">
                            Back
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};