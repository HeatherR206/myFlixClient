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

    const toggleFavorite = async (e) => {
        e.preventDefault();
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
            } else if (response?.response.status === 401) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Favorite toggle error:", error);
        }
    };

    if (isHorizontal) {
        return (
            <Card className="custom-card-horizontal shadow-sm h-100">
                <Button
                    variant="link"
                    onClick={toggleFavorite}
                    className="glass-heart-button shadow-sm"
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                    <i
                        className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart text-dark"}`}
                    ></i>
                </Button>

                <Row className="g-0 h-100 flex-column flex-md-row">
                    <Col xs={12} md={4}>
                        <div
                            className="horizontal-poster-wrapper h-100"
                        >
                            <Card.Img
                                src={movie.imagePath}
                                className="img-fluid h-100 w-100 object-fit-cover"
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <Card.Body className="d-flex flex-column h-100">
                            <Card.Title className="card-title-clamp pe-5 mb-3">
                                {movie.title}
                            </Card.Title>
                            <Card.Text className="summary-clamp mb-3">{movie.summary}</Card.Text>

                            <Link
                                to={`/movies/${encodeURIComponent(movie._id)}`}
                                className="btn btn-corner btn-primary btn-sm rounded-pill glow-on-hover"
                            >
                                More Info
                            </Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card className="h-100 custom-card-vertical shadow-sm">
            <Button
                variant="link"
                onClick={toggleFavorite}
                className="glass-heart-button shadow-sm"
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
                <i
                    className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart text-dark"}`}
                ></i>
            </Button>

            <Card.Img
                variant="top"
                src={movie.imagePath}
                className="card-img-vertical"
                alt={movie.title}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title-clamp pe-4 mb-3">
                    {movie.title}
                </Card.Title>

                <div className="mb-3">
                    <Badge pill bg="none" className="custom-badge-outline text-muted">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                    </Badge>
                </div>

                <Card.Text className="summary-clamp mb-3">{movie.summary}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="btn btn-corner btn-primary rounded-pill glow-on-hover">
                        More Info
                </Link>
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
