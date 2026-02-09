import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/filter";
import { setUser } from "../../redux/reducers/user";
import { clearToken } from "../../redux/reducers/token";
import { useApi } from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button, Tabs, Tab, Container, Card, Modal } from "react-bootstrap";
import { API_URL } from "../../config";

export const ProfileView = () => {
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const allMovies = useSelector((state) => state.movies);
    const filter = useSelector((state) => state.filter);
    const { authFetch, user } = useApi();

    const favoriteMovies = useMemo(() => {
        return allMovies.filter((m) => user?.favoriteMovies?.includes(m._id));
    }, [allMovies, user]);

    const deepFilter = (movieList, searchTerm) => {
        if (!searchTerm) return movieList;
        const term = searchTerm.toLowerCase();

        return movieList.filter((m) => {
            return (
                m.title.toLowerCase().includes(term) ||
                m.genres?.some(g => g.genreName.toLowerCase().includes(term)) ||
                m.directors?.some(d => d.directorName.toLowerCase().includes(term)) ||
                m.cast?.some(c => c.castName.toLowerCase().includes(term))
            );
        });
    };

    const filterFavorites = useMemo(() => deepFilter(favoriteMovies, filter), [favoriteMovies, filter]);
    const filterAllMovies = useMemo(() => deepFilter(allMovies, filter), [allMovies, filter]);

    const handleRemoveFavorite = async (movieId) => {
        try {
            const response = await authFetch(
                `${API_URL}/users/${user.username}/movies/${movieId}`,
                {
                    method: "DELETE",
                }
            );

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

    const confirmDeleteAccount = async () => {
        try {
            const response = await authFetch(`${API_URL}/users/${user.username}`, {
                method: "DELETE",
            });

            if (response && response.ok) {
                setShowDeleteModal(false);
                dispatch(setUser(null));
                dispatch(clearToken());
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Delete account error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    if (!user) return <div className="text-center mt-5">Loading user profile...</div>;

    return (
        <Container fluid className="profile-view-container mt-3">
            <Row className="profile-view-row">
                <Col
                    xs={{ span: 12, order: 2 }}
                    lg={{ span: 5, order: 1 }}
                    className="mb-4 left-hide-scrollbar profile-side-column"
                >
                    <div className="d-flex flex-column gap-3">
                        <Card className="user-mngmt-column shadow-sm border-0">
                            <Card.Body className="p-3">
                                <Tabs
                                    defaultActiveKey="info"
                                    id="profile-tabs"
                                    className="custom-tabs text-sm"
                                >
                                    <Tab eventKey="info" title="Account Details">
                                        <div className="mt-3">
                                            <UserInfo />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="edit" title="Edit Settings">
                                        <div className="mt-3">
                                            <UpdateUser />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                        <Card className="danger-zone-card p-3 border border-danger mt-2">
                            <Card.Body className="p-3 text-center">
                                <Card.Title className="fw-extra-bold text-danger mb-3">
                                    ! Danger Zone !
                                </Card.Title>
                                <div className="fw-bold text-muted mb-1">
                                    Deleting your account is <strong>permanent</strong> and will
                                    erase all saved data.
                                </div>
                                <Button
                                    variant="outline-danger"
                                    className="delete-button rounded-pill px-4 fw-bold mt-3"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Delete My Account
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>

                <Col
                    xs={{ span: 12, order: 1 }}
                    lg={{ span: 7, order: 2 }}
                    className="mb-4 right-scroll-column"
                >
                    {filter.length > 0 && (
                        <Card className="search-card mb-4 border-primary shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Card.Title className="mb-0 fw-extra-bold">
                                        Search Results
                                    </Card.Title>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => dispatch(setFilter(""))}
                                        className="px-3"
                                    >
                                        Clear Search
                                    </Button>
                                </div>
                                <Row>
                                    {filterAllMovies.length === 0 ? (
                                        <p className="text-muted">No movies match "{filter}"</p>
                                    ) : (
                                        filterAllMovies.map((movie) => (
                                            <Col className="mb-3" key={movie._id} md={12} lg={12}>
                                                <MovieCard movie={movie} isHorizontal={true} />
                                            </Col>
                                        ))
                                    )}
                                    {filterFavorites.length === 0 && filter.length > 0 && (
                                        <Col xs={12} className="text-center mt-3">
                                            <p className="text-muted">No favorites match "{filter}"</p>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                className="px-3"
                                                onClick={() => dispatch(setFilter(""))}
                                            >
                                                View All Favorites
                                            </Button>
                                        </Col>
                                    )}
                                </Row>

                                {filterAllMovies.length > 3 && (
                                    <div className="text-center mt-3">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => dispatch(setFilter(""))}
                                            className="px-3"
                                        >
                                            Clear Search
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    )}

                    <Card className="my-faves">
                        <Card.Body>
                            <Card.Title className="mb-4 fw-extra-bold">myFlix Faves</Card.Title>
                            <Row>
                                {filterFavorites.length === 0 ? (
                                    <Col>
                                        <p className="text-muted mt-3">
                                            No favorite movies match your search.
                                        </p>
                                    </Col>
                                ) : (
                                    filterFavorites.map((movie) => (
                                        <Col
                                            className="mb-4 text-center"
                                            key={movie._id}
                                            xs={6}
                                            md={4}
                                            lg={3}
                                        >
                                            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                                <div className="favorite-poster-wrapper mb-2" style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
                                                    <img
                                                        src={movie.imagePath}
                                                        alt={movie.title}
                                                        className="favorite-poster-img rounded shadow-sm w-100"
                                                        style={{
                                                            height: "auto",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            </Link>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="border-0"
                                                onClick={() => handleRemoveFavorite(movie._id)}
                                                style={{
                                                    textDecoration: "none",
                                                    fontSize: "0.8rem",
                                                }}
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

            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
                className="custom-modal"
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold text-danger">
                        Confirm Account Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <i
                        className="bi bi-exclamation-triangle-fill text-danger"
                        style={{ fontSize: "3.4rem" }}
                    ></i>
                    <h4 className="mb-4">Are you absolutely certain?</h4>
                    <p className="text-muted">This will <strong>permanently</strong> delete your Profile and "myFlix
                        Faves" movies.</p>
                    <p className="text-muted"><strong>This action cannot be undone.</strong></p>
                </Modal.Body>
                <Modal.Footer className="border-0 mt-5">
                    <Button
                        variant="outline-danger"
                        className="delete-btn px-4 border-0 btn-sm"
                        onClick={confirmDeleteAccount}
                    >
                        Yes, Delete Everything
                    </Button>
                    <Button
                        variant="primary"
                        className="btn-corner px-4 btn-lg"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
