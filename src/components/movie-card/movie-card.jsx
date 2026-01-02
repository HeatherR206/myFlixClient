import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)}>
            <Card.Img 
                variant="top" 
                src={movie.imagePath?.startsWith('http')
                    ? movie.imagePath
                    : "https://via.placeholder.com/500x750?text=No+Poster+Available"}
                alt={movie.title} 
            />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.summary}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">Movie Details</Button>
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
    onMovieClick: PropTypes.func.isRequired,
};
