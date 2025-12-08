export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} alt={movie.title} />
        </div>
        <br></br>
        <div>
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movie.title}</span>
        </div>
        <br></br>
        <div>
          <span>
            <strong>Summary: </strong>
          </span>
          <span>{movie.summary}</span>
        </div>
        <br></br>
        <div>
          <span>
            <strong>Director: </strong>
          </span>
          <span>{movie.director}</span>
        </div>
        <br></br>
        <div>
          <span>
            <strong>Genre: </strong>
          </span>
          <span>{movie.genre}</span>
        </div>
        <br></br>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
};