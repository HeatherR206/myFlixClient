import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        return () => {
            dispatch(setFilter(""));
        };
    }, [dispatch]);

    const favoriteMovies = allMovies.filter((m) => user?.favoriteMovies?.includes(m._id));

    const filterFavorites = favoriteMovies.filter((m) =>
        m.title.toLowerCase().includes(filter.toLowerCase())
    );

    const filterAllMovies = allMovies.filter((m) =>
        m.title.toLowerCase().includes(filter.toLowerCase())
    );

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
        <Container className="profile-view mt-4">
            <Row>
                <Col
                    lg={5}
                    className="mb-4"
                    style={{
                        maxHeight: "85vh",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    <div className="d-flex flex-column gap-3 pe-2">
                        <Card className="user-mngmt-column shadow-sm border-0">
                            <Card.Body
                                className="p-4"
                                style={{
                                    maxHeight: "70vh",
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                }}
                            >
                                <Tabs
                                    defaultActiveKey="info"
                                    id="profile-tabs"
                                    className="mb-3 custom-tabs"
                                >
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
                        <Card className="danger-zone-card p-3 border border-danger mt-2">
                            <Card.Body className="p-3 text-center">
                                <Card.Title className="fw-extra-bold text-danger mb-3">
                                    ! Danger Zone !
                                </Card.Title>
                                <div className="fw-bold  text-muted mb-1">
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
                    lg={7}
                    className="mb-4 right-scroll-column"
                    style={{
                        maxHeight: "85vh",
                        overflowY: "auto",
                        paddingRight: "10px",
                    }}
                >
                    {filter.length > 0 && (
                        <Card className="search-card mb-4 border-primary shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Card.Title className="mb-0 fw-extra-bold">
                                        Search Results
                                    </Card.Title>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => dispatch(setFilter(""))}
                                        className="px-2"
                                    >
                                        Clear Search Results
                                    </Button>
                                </div>
                                <Row>
                                    {filterAllMovies.length === 0 ? (
                                        <p className="text-muted">No movies match "{filter}"</p>
                                    ) : (
                                        filterAllMovies.map((movie) => (
                                            <Col className="mb-2" key={movie._id} md={12} lg={12}>
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
                                                <div className="favorite-poster-wrapper mb-2">
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
                <Modal.Body className="text-center py-4">
                    <i
                        className="bi bi-exclamation-triangle-fill text-danger mb-3"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5>Are you certain you want to delete your account?</h5>
                    <p className="text-muted">
                        This will <strong>permanently</strong> delete your profile and favorite
                        movies list. <strong>This action cannot be undone.</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center pb-4">
                    <Button
                        variant="secondary"
                        className="rounded-pill px-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="rounded-pill px-4"
                        onClick={confirmDeleteAccount}
                    >
                        Yes, Delete Everything
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
