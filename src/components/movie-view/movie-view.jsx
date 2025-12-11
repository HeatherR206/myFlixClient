export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        {/* <div>
          <img src={movie.image} alt={movie.title} />
        </div> */}
        <br />

        <div>
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movie.title}</span>
        </div>
        <br />

        <div>
          <span>
            <strong>Summary: </strong>
          </span>
          <span>{movie.summary}</span>
        </div>
        <br />

        <div>
            <span><strong>Genre: </strong></span>
            <span>{movie.genre.join(', ')}</span>
        </div>
        <br />

        <div>
          <span><strong>Director: </strong></span>
          <span>{movie.director.join(', ')}</span>
        </div>
        <br />
        <button onClick={onBackClick}>Back</button>
      </div>
    );
};