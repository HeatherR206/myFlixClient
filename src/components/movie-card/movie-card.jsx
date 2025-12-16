import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            <img src={movie.image} alt={movie.title} />
            <div>{movie.title}</div>
        </div>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    summary: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
