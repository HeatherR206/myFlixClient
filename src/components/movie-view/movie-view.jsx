import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Card, Col, Row, Button, Badge, Container } from "react-bootstrap";
import { API_URL } from "../../config";

export const MovieView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const movies = useSelector((state) => state.movies);
    const { authFetch, user } = useApi();
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    if (!movie || movies.length === 0) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-light mt-3">Loading movie details...</p>
            </Container>
        );
    }

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
        <Row className="justify-content-center mt-5 pb-5">
            <Col lg={12}>
                <Card className="movie-view-card shadow-lg">
                    <Row className="g-0 h-100">
                        <Col md={5} lg={4}>
                            <Card.Img
                                src={movie.imagePath}
                                className="img-fluid h-100 object-fit-cover"
                                alt={movie.title}
                            />
                        </Col>

                        <Col md={7} lg={8} className="d-flex flex-column">
                            <Card.Body className="p-4 flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Card.Title className="fw-bold mb-3">{movie.title}</Card.Title>
                                    <Button
                                        variant="link"
                                        onClick={toggleFavorite}
                                        className="glass-heart-button"
                                        title={
                                            isFavorite
                                                ? "Remove from Favorites"
                                                : "Add to Favorites"
                                        }
                                    >
                                        <i
                                            className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}
                                        ></i>
                                    </Button>
                                </div>
                                
                                <Card.Text className="lead movie-summary mb-3">
                                    {movie.summary}
                                </Card.Text>

                                <div className="movie-metadata mt-4">
                                    <p className="text-muted mb-1">
                                        <strong>Release Date: </strong>
                                        {movie.releaseDate
                                            ? new Date(movie.releaseDate).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Genre:</strong>{" "}
                                        {movie.genres?.length > 0 ? movie.genres.map(g => g.genreName).join(", ") : "N/A"}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Director:</strong>{" "}
                                        {movie.directors?.length > 0 ? movie.directors.map(d => d.directorName).join(", ") : "N/A"}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Cast:</strong>{" "}
                                        {movie.cast?.length > 0 ? movie.cast.map(c => c.castName).join(", ") : "N/A"}
                                    </p>
                                </div>

                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                    className="btn-corner glow-on-hover"
                                >
                                    Back
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};
