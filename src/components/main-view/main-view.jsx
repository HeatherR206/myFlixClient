import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { API_URL } from "../../config";

import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);    

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear(); 
    };

    useEffect(() => {
        if (!token) return;

        fetch(`${API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch movies");
            return response.json();
        })
        .then((movies) => {
            const moviesArray = Array.isArray(movies) ? movies : [];
            setMovies(moviesArray);
        })
        .catch(e => console.error(e));
    }, [token]);                
            
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    <br />
                    <br />
                    <p><span><strong>or</strong></span></p>
                    <br />
                    <br />
                    <SignupView />
                </Col>     
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    <Col md={12} className="text-end mb-4">
                        <Button variant="outline-danger" onClick={onLoggedOut} size="md" className="ms-2">Logout</Button>
                    </Col>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>  
    );
};
