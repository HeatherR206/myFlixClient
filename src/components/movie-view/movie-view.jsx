export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <h2>Title: </h2>
                <h2>{ movie.title }</h2>
            </div>
            <div>
                <img src={ movie.image } alt={ movie.title } />
            </div>
            <div>
                <span>Director: </span>
                <span>{ movie.director.directorName }</span>
            </div>
            <div> 
                <span>Cast: </span>
                <span>[{ movie.cast.actorName }]</span>
            </div>
            <div>
                <span>Release Date: </span>
                <span>{ movie.releaseDate }</span>
            </div>
            <button onClick={ onBackClick }>Back to movie list</button>
        </div>
    );
};