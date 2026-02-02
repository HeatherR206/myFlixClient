import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Card, Col, Row, Button, Badge } from "react-bootstrap";
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
        <Row className="justify-content-center mt-5 pb-5">
            <Col lg={12}>
                <Card className="movie-view-card shadow-lg overflow-hidden">
                    <Row className="g-0">
                        <Col lg={4}>
                            <Card.Img
                                src={movie.imagePath}
                                className="img-fluid rounded-start h-100 object-fit-cover"
                                alt={movie.title}
                            />
                        </Col>

                        <Col md={8}>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h2 className="display-5 fw-bold mb-3">{movie.title}</h2>
                                    <Button
                                        variant="link"
                                        onClick={toggleFavorite}
                                        className="glass-heart-button rounded-circle shadow-sm"
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

                                <Card.Text className="mb-3 text-muted">
                                    <strong>Release Date: </strong>
                                    {movie.releaseDate
                                        ? new Date(movie.releaseDate).toLocaleDateString()
                                        : "N/A"}
                                </Card.Text>

                                <p className="lead mb-4">{movie.summary}</p>

                                <div className="movie-metadata mt-4">
                                    <p>
                                        <strong>Genre:</strong>{" "}
                                        {movie.genres?.map((g) => g.genreName).join(", ")}
                                    </p>
                                    <p>
                                        <strong>Director:</strong>{" "}
                                        {movie.directors?.map((d) => d.directorName).join(", ")}
                                    </p>
                                    <p>
                                        <strong>Cast:</strong>{" "}
                                        {movie.cast?.map((c) => c.castName).join(", ")}
                                    </p>
                                </div>

                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={() => {
                                        dispatch(setFilter(""));
                                        navigate(-1);
                                    }}
                                    className="glow-on-hover mt-5"
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
