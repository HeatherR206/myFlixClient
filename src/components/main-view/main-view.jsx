import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../nav-bar/nav-bar";
import { ProfileView } from "../profile-view/profile-view";
import { API_URL } from "../../config";

export const MainView = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    const filter = useSelector((state) => state.filter);
    const { authFetch, user, token } = useApi();
    const [loading, setLoading] = useState(false);
    const initialLoadDone = useRef(false);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    useEffect(() => {
        if (!token) {
            initialLoadDone.current = false;
            return;
        }

        const fetchMovies = async () => {
            if (movies.length === 0) setLoading(true);

            try {
                const response = await authFetch(`${API_URL}/movies`);
            
                if (response && response.ok) {
                    const moviesData = await response.json();
                    dispatch(setMovies(moviesData));
                }
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                setLoading(false);
                initialLoadDone.current = true;
            }
        };

        fetchMovies();
    }, [token, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(setFilter(""));
        };
    }, [dispatch]);    
            
    return (
        <>
            <NavBar />
            <Container>
                <Row className="justify-content-md-center mt-4">
                    <Routes>
                        <Route
                            path="/signup"
                            element={user ? <Navigate to="/" /> : (
                                <Col md={6}>
                                    <Card className="mt-4 shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="fw-bold text-center mb-4">Create Account</Card.Title>
                                            <SignupView />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        />

                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : (
                                <Col md={6}>
                                    <Card className="mt-4 shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="fw-bold text-center mb-4">Login</Card.Title>
                                            <LoginView />
                                        </Card.Body>                              
                                    </Card>
                                </Col>
                            )}
                        />

                        <Route
                            path="/users/:username"
                            element={!user ? <Navigate to="/login" replace /> : (
                                <Col md={12}><ProfileView /></Col>
                            )}
                        /> 

                        <Route
                            path="/movies/:movieId"
                            element={!user ? <Navigate to="/login" replace /> : (
                                <Col md={8}><MovieView /></Col>
                            )}
                        />  

                        <Route
                            path="/"
                            element={
                                !user || !token ? (
                                    <Navigate to="/login" replace />
                                ) : (loading && movies.length === 0) ? (
                                    <Col className="text-center mt-5">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="mt-2 text-muted">Loading movies...</p>
                                    </Col>
                                ) : movies.length === 0 ? (
                                    <Col className="text-center mt-5">
                                        <p className="text-muted">Synchronizing data...</p>
                                    </Col>
                                ) : filteredMovies.length === 0 ? (
                                    <Col md={12} className="text-center mt-5">
                                        <p>No movies found matching "{filter}"</p>
                                        <Button variant="outline-primary" onClick={() => dispatch(setFilter(""))}>
                                            Clear Search
                                        </Button>
                                    </Col>
                                ) : (
                                    filteredMovies.map((movie) => (
                                        <Col className="mb-5" key={movie._id} md={4} lg={3}>
                                            <MovieCard movie={movie} />
                                        </Col>
                                    ))
                                )
                            }
                        />    
                    </Routes>
                </Row>
            </Container>
        </>    
    );
};