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
        try {
            const response = await authFetch(`${API_URL}/users/${user.username}/movies/${movieId}`, {
                method: "DELETE",
            });

            if (response && response.ok) {
                let updatedUser;
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    updatedUser = await response.json();
                } else {
                    const updatedFavorites = user.favoriteMovies.filter((id) => id !== movieId);
                    updatedUser = { ...user, favoriteMovies: updatedFavorites };
                }

                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));
            } else {
                alert("Failed to remove from favorites.");
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
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
            <Row>
                <Col lg={5} className="mb-4">
                    <Card className="user-mngmt-column shadow-sm border-0 m-2 sticky-top" style={{ top: "100px", zIndex: 1 }}>
                        <Card.Body className="p-4">
                            <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-3 custom-tabs">
                                <Tab eventKey="info" title="Account Details">
                                    <div className="mt-3">
                                        <UserInfo />
                                    </div>
                                </Tab>
                                <Tab eventKey="edit" title="Account Settings">
                                    <div className="mt-3">
                                        <UpdateUser />
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                <div>
                        <Card className="p-2 border border-danger rounded mt-3">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title className="fw-bold text-danger mb-3">Danger Zone</Card.Title>
                                    <Card.Text className="small text-muted mb-0">
                                        Permanently delete your account and all saved data. This action cannot be undone.
                                    </Card.Text>
                                </div>
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    width="w-100"
                                    className="rounded-pill px-4 fw-bold w-100"
                                    onClick={deleteAccount}
                                >
                                    Delete Account
                                </Button>
                            </Card.Body>
                        </Card>
                </div>
                </Col>

                
                
                <Col lg={7} className="mb-4">
                    {filter.length > 0 && (
                        <Card className="mb-4 border-primary shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Card.Title className="mb-0 fw-bold">Search Results</Card.Title>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => dispatch(setFilter(""))}>
                                        Clear Search Results
                                    </Button>
                                </div>
                                <Row>
                                    {filterAllMovies.length === 0 ? (
                                        <p className="text-muted">No movies match "{filter}"</p>
                                    ) : (
                                        filterAllMovies.map((movie) => (
                                            <Col className="mb-2" key={movie._id} md={12} lg={6}>
                                                <MovieCard movie={movie} isHorizontal={true} />
                                            </Col>
                                        ))
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    )}

                    <Card className="my-faves">
                        <Card.Body>
                            <Card.Title className="mb-4 fw-bold">myFlix Faves</Card.Title>
                            <Row>
                                {filterFavorites.length === 0 ? (
                                    <Col><p className="text-muted mt-3">No favorite movies match your search.</p></Col>
                                ) : (
                                    filterFavorites.map((movie) => (
                                        <Col className="mb-4 text-center" key={movie._id} xs={6} md={4} lg={3}>
                                            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                                <div className="favorite-poster-wrapper mb-2">
                                                    <img
                                                        src={movie.imagePath}
                                                        alt={movie.title}
                                                        className="favorite-poster-img rounded shadow-sm w-100"
                                                        style={{ height: "auto", objectFit: "cover" }}
                                                    />
                                                </div>
                                            </Link>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="text-danger mt-1 p-0"
                                                onClick={() => handleRemoveFavorite(movie._id)}
                                                style={{ textDecoration: "none", fontSize: "0.8rem"}}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    ))
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};