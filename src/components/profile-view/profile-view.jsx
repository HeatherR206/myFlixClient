import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/filter";
import { setUser } from "../../redux/reducers/user";
import { clearToken } from "../../redux/reducers/token";
import { useApi } from "../../hooks/useApi";
import { Link } from "react-router-dom"
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button, Tabs, Tab, Container, Card } from "react-bootstrap";
import { API_URL } from "../../config";
import "./profile-view.scss";

export const ProfileView = () => {
    const dispatch = useDispatch();

    const allMovies = useSelector((state) => state.movies);
    const filter = useSelector((state) => state.filter);

    const { authFetch, user } = useApi();

    useEffect(() => {
        return () => {
            dispatch(setFilter(""));
        };
    }, [dispatch]);

    const favoriteMovies = allMovies.filter((m) => 
        user?.favoriteMovies?.includes(m._id)
    );   

    const filterFavorites = favoriteMovies.filter((m) => m.title.toLowerCase().includes(filter.toLowerCase())
    );

    const filterAllMovies = allMovies.filter((m) => m.title.toLowerCase().includes(filter.toLowerCase())
    );

    const handleRemoveFavorite = async (movieId) => {
        const response = await authFetch(`${API_URL}/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
        });

        if (response && response.ok) {
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
            dispatch(setUser(updatedUser));
        }
    };

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            const response = await authFetch(`${API_URL}/users/${user.username}`, {
                method: "DELETE",
            });

            if (response && response.ok) {
                dispatch(setUser(null));
                dispatch(clearToken());
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    };

    if (!user) return <div className="text-center mt-5">Loading user profile...</div>;

    return (
        <Container className="profile-view mt-4"> 
            {filter.length > 0 && (
                <Card className="mb-4 border-primary shadow-sm">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Card.Title className="mb-0 fw-bold">Search Results (All Movies)</Card.Title>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => dispatch(setFilter(""))}
                            >
                                Clear Search Results
                            </Button>
                        </div>
                
                        <Row>
                            {filterAllMovies.length === 0 ? (
                                <p className="text-muted">No movies in the database match "{filter}"</p>
                            ) : (
                                filterAllMovies.map((movie) => (
                                    <Col className="mb-4" key={movie._id} md={3}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))
                            )}
                        </Row>
                    </Card.Body>
                </Card>
            )}

            <Card className="mb-4 shadow-sm border-1">
                <Card.Body>
                    <Card.Title className="mb-4 fw-bold">myFlix Faves</Card.Title>
                    <Row>
                        {filterFavorites.length === 0 ? (
                            <Col><p className="text-muted mt-3">No favorite movies found that match your search.</p></Col>
                        ) : (
                            filterFavorites.map((movie) => (
                                <Col className="mb-4 text-center" key={movie._id} xs={6} md={3} lg={2}>
                                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                        <div className="favorite-poster-wrapper mb-2">
                                            <img
                                                src={movie.imagePath}
                                                alt={movie.title}
                                                className="favorite-poster-img rounded shadow-sm"
                                                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                            />
                                        </div>
                                    </Link>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-danger mt-2 p-0"
                                        onClick={() => handleRemoveFavorite(movie._id)}
                                        style={{ textDecoration: "none", fontSize: "0.85rem"}}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            ))
                        )}
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-3 custom-tabs">
                        <Tab eventKey="info" title="My Profile">
                            <div className="mt-3">
                                <UserInfo />
                            </div>
                        </Tab>
                        <Tab eventKey="edit" title="Edit Profile">
                            <div className="mt-3">
                                <UpdateUser />
                            </div>
                        </Tab>
                        <Tab eventKey="danger" title="Account Actions">
                            <div className="p-3 border border-danger rounded mt-3">
                                <h4 className="fw-bold text-danger mb-3">Danger Zone</h4>
                                <p>Are you certain? Deleting your account is permanent and cannot be undone.</p>
                                <Button variant="danger" className="px-4" onClick={deleteAccount}>
                                    Permanently Delete My Account
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Container>
    );
};
