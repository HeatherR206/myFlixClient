import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../nav-bar/nav-bar";
import { ProfileView } from "../profile-view/profile-view";
import { API_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const movies = useSelector((state) => state.movies);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    const dispatch = useDispatch();

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");
    
    useEffect(() => {
        if (!token) {
            dispatch(setMovies([]));
            return;
        }

        setLoading(true);

        fetch(`${API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch movies");
            return response.json();
        })
        .then((movies) => {
            const moviesArray = Array.isArray(movies) ? movies : [];
            dispatch(setMovies(moviesArray));
            setLoading(false);
        })
        .catch(e => {
            console.error(e);
            setLoading(false);
        });
    }, [token]);    
    
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );
            
    return (
        <BrowserRouter>
            <NavBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={(value) => setFilter(value)}
            />
            <Container>
                <Row className="justify-content-md-center mt-4">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                user ? <Navigate to="/" /> : (
                                    <Col md={5}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Signup</Card.Title>
                                                <SignupView />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                user ? <Navigate to="/" /> : (
                                    <Col md={5}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Login</Card.Title>
                                                <LoginView 
                                                    onLoggedIn={(user, token) => {
                                                        setUser(user);
                                                        setToken(token);
                                                        localStorage.setItem("user", JSON.stringify(user));
                                                        localStorage.setItem("token", token);
                                                    }}
                                                />    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        />

                        {/* <Route
                            path="/movies/:movieId"
                            element={
                                !user ? <Navigate to="/login" replace /> :
                                loading ? (
                                    <Col className="text-center mt-5">
                                        <Spinner animation="border" variant="primary" />
                                    </Col>
                                ) : movies.length === 0 ? (
                                    <Col md={12}>The movie list is empty!</Col>
                                ) : (
                                    <Col md={8}> 
                                        <MovieView 
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )
                            }
                        />
 */}
                        <Route
                            path="/users/:username"
                            element={
                                !user ? <Navigate to="/login" replace /> :
                                loading ? (
                                    <Col className="text-center mt-5">
                                        <Spinner animation="border" variant="primary" />
                                    </Col>    
                                ) : (
                                    <Col md={8}>
                                        <ProfileView 
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />        
                                    </Col>
                                )
                            }
                        /> 

                        <Route
                            path="/"
                            element={
                                !user ? <Navigate to="/login" replace /> :
                                loading ? (
                                    <Col className="text-center mt-5">
                                        <Spinner animation="border" variant="primary" />
                                    </Col>
                                ) : filteredMovies.length === 0 ? (
                                    <Col md={12}>No movies found matching that search</Col>
                                ) :  (
                                    filteredMovies.map((movie) => (
                                        <Col className="mb-5" key={movie._id} md={3}>
                                            <MovieCard 
                                                movie={movie} 
                                                user={user}
                                                token={token}
                                                setUser={setUser}
                                            />
                                        </Col>
                                    ))
                                )
                            }
                        />    
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};