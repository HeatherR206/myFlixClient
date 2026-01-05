import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { API_URL } from "../../config";

import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            setMovies([]);
            return;
        }

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
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />        
                                    </Col>
                                )}
                            </>
                        }
                    />    
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />    
                </Routes>
            </Row>  
        </BrowserRouter>
    );
};