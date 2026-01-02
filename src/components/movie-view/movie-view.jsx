import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img className="w-100" src={movie.imagePath} alt={movie.title} />
        </div>
        <br />

        <div>
          <span><strong>Title: </strong></span>
          <span>{movie.title}</span>
        </div>
        <br />

        <div>
          <span><strong>Summary: </strong></span>
          <span>{movie.summary}</span>
        </div>
        <br />

        <div>
            <span><strong>Genres: </strong></span>
            <span>
                {movie.genres && movie.genres.length > 0 
                    ? movie.genres.map(g => g.genreName).join(', ') 
                    : 'N/A'}
            </span>
        </div>
        <br />

        <div>
            <span><strong>Directors: </strong></span>
            <span>
                {movie.directors && movie.directors.length > 0
                    ? movie.directors.map(d => d.directorName).join(', ')
                    : 'N/A'}
            </span>
        </div>
        <br />
        <button 
            onClick={onBackClick}   
            className="back-button"
            style={{ cursor: "pointer "}}
            >
            Back
        </button>
      </div>
    );
};

MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired,
};