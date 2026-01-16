import React from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../config";
import { Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
    if (!user) return null;
    
    const isFavorite = user.favoriteMovies && user.favoriteMovies.includes(movie._id);    
    
    const toggleFavorite = () => {
        const method = isFavorite ? "DELETE" : "POST";
        const url = `${API_URL}/users/${user.username}/movies/${movie._id}`;

        fetch(url, {
            method: method,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to update Favorite Movies");
            }
        })
        .then((updatedUser) => {
            if (updatedUser) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
         })
         .catch((e) => alert(e.message));
    };


    return (
        <Card className="h-100 shadow-md custom-card-border position-relative">
            <Card.Img 
                variant="top" 
                src={movie.imagePath?.startsWith('http')
                    ? movie.imagePath
                    : "https://via.placeholder.com/500x750?text=No+Poster+Available"}
                alt={movie.title} />
            <Card.Body className="d-flex flex-column">
                <Card.Title><strong>{movie.title}</strong></Card.Title>
                <Button
                    variant="link"
                    className="position-absolute top-0 end-0 m-2 text-danger favorite-button"
                    onClick={toggleFavorite}
                    style={{ fontSize: "2rem", color: isFavorite ? "red" : "grey", textDecoration: "none"}}
                >
                        {isFavorite ? "❤️" : "🤍"}
                </Button>         
                <div className="mb-2">
                    <Badge pill bg="none" className="custom-badge-outline">
                        {new Date(movie.releaseDate).getFullYear()}
                    </Badge>
                </div>
                <br />
                <Card.Text className="text-truncate-container">{movie.summary}</Card.Text>
                <br />
                <Link className="mt-auto" to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="primary" className="w-100">More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
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
