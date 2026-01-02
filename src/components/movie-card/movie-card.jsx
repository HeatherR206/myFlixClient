import PropTypes from "prop-types";
import { Button, Card, Badge } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 shadow-md custom-card-border">
            <Card.Img 
                variant="top" 
                src={movie.imagePath?.startsWith('http')
                    ? movie.imagePath
                    : "https://via.placeholder.com/500x750?text=No+Poster+Available"}
                alt={movie.title} 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title><strong>{movie.title}</strong></Card.Title>                
                <div className="mb-2">
                    <Badge pill bg="none" className="custom-badge-outline">
                        {new Date(movie.releaseDate).getFullYear()}
                    </Badge>
                </div>
                <br />
                <Card.Text className="text-truncate-container">{movie.summary}</Card.Text>
                <br />
                <div className="mt-auto">
                    <Button onClick={() => onMovieClick(movie)} className="w-100" variant="primary">More
                    </Button>
                </div>
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
