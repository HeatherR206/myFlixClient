import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { useApi } from "../../hooks/useApi";
import PropTypes from "prop-types";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export const MovieCard = ({ movie, isHorizontal = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authFetch, user } = useApi();
    if (!user || !movie) return null;

    const isFavorite = user.favoriteMovies && user.favoriteMovies.includes(movie._id);

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

    if (isHorizontal) {
        return (
            <Card className="custom-card-horizontal overflow-hidden border-1 shadow-sm h-100">
                <Row className="g-0 h-100">
                    <Col xs={4} md={3}>
                        <div
                            style={{ height: "100%", minHeight: "180px" }}
                            className="horizontal-poster-wrapper"
                        >
                            <Card.Img
                                src={movie.imagePath}
                                className="rounded-start h-100 w-100 object-fit-cover"
                            />
                        </div>
                    </Col>
                    <Col xs={8} md={9} className="d-flex align-items-center">
                        <Card.Body className="py-3 px-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <Card.Title className="mb-0">
                                    <strong>{movie.title}</strong>
                                </Card.Title>
                                <Button
                                    variant="link"
                                    onClick={toggleFavorite}
                                    className="glass-heart-button horizontal shadow-sm rounded-circle"
                                    title={
                                        isFavorite ? "Remove from Favorites" : "Add to Favorites"
                                    }
                                >
                                    <i
                                        className={`bi ${isFavorite ? "bi-heart-fill text-danger horizontal" : "bi-heart horizontal text-dark"}`}
                                    ></i>
                                </Button>
                            </div>

                            <Card.Text className="horizontal-summary">{movie.summary}</Card.Text>
                            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                <Button
                                    variant="primary"
                                    className="more-button horizontal btn-sm glow-on-hover"
                                >
                                    More Info
                                </Button>
                            </Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card className="h-100 custom-card-border">
            <Card.Img
                variant="top"
                src={
                    movie.imagePath?.startsWith("http")
                        ? movie.imagePath
                        : "https://via.placeholder.com/500x750?text=No+Poster+Available"
                }
                alt={movie.title}
            />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">
                        <strong>{movie.title}</strong>
                    </Card.Title>
                    <Button
                        variant="link"
                        onClick={toggleFavorite}
                        className="glass-heart-button vertical rounded-circle shadow-sm"
                        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        <i
                            className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}
                        ></i>
                    </Button>
                </div>

                <div className="mb-2">
                    <Badge pill bg="none" className="custom-badge-outline small">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                    </Badge>
                </div>

                <Card.Text className="text-truncate-container">{movie.summary}</Card.Text>
                <div className="mt-auto-container">
                    <Link className="mt-2" to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button
                            variant="primary"
                            className="more-button vertical btn-lg glow-on-hover"
                        >
                            More Info
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imagePath: PropTypes.string,
        releaseDate: PropTypes.string,
        summary: PropTypes.string,
    }).isRequired,
    isHorizontal: PropTypes.bool,
};
