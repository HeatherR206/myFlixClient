import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { useApi } from '../../hooks/useApi';
import PropTypes from "prop-types";
import { Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();

    const { authFetch, user } = useApi();
    if (!user || !movie ) return null;
    
    const isFavorite = user.favoriteMovies && user.favoriteMovies.includes(movie._id);
    
    const toggleFavorite = async () => {
        const method = isFavorite ? "DELETE" : "POST";
        const url = `${API_URL}/users/${user.username}/movies/${movie._id}`;

        try {
            const response = await authFetch(url, { method });

            if (response && response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));
            } else if (response && !response.ok) {
                alert("Failed to update Favorite Movies");
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    return (
        <Card className="h-100 shadow-md custom-card-border position-relative">
            <Card.Img 
                variant="top" 
                src={movie.imagePath?.startsWith('http')
                    ? movie.imagePath
                    : "https://via.placeholder.com/500x750?text=No+Poster+Available"}
                alt={movie.title} 
            />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0"><strong>{movie.title}</strong></Card.Title>
                    <Button
                        variant="link"
                        className="p-0 text-danger"
                        onClick={toggleFavorite}
                        style={{ 
                            fontSize: "2rem",
                            textDecoration: "none",
                        }}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </Button>
                </div>

                <div className="mb-2">
                    <Badge pill bg="none" className="custom-badge-outline small">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                    </Badge>
                </div>

                <Card.Text className="text-truncate-container">
                    {movie.summary}
                </Card.Text>
        
                <Link className="mt-3" to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="primary" className="w-100">More Info</Button>
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
        summary: PropTypes.string
    }).isRequired,
};
