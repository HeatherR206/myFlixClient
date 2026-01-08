import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

export const FavoriteMoviesList = ({ favoriteMovies, onRemoveFavorite }) => {
    if (favoriteMovies.length === 0) {
        return <p>You haven't favorited any movies yet!</p>;
    }
    return (
        <>
            <h2>Favorite Movies</h2>
            <Row>
                {favoriteMovies.map((movie) => (
                    <Col key={movie._id} md={3} className="mb-4">
                        <MovieCard
                            movie={movie}
                            isFavorite={true}
                            onToggleFavorite={() => onRemoveFavorite(movie._id)}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};