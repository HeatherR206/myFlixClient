import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom"
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { API_URL } from "../../config";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, token, setUser }) => {
    const favoriteMovies = movies.filter((m) => 
        user.favoriteMovies && user.favoriteMovies.includes(m._id)
    );
    
    const handleUpdate = (formData) => {
        const dataToSend = { ...formData };
        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        fetch(`${API_URL}/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => { throw new Error(err.message || "Update failed") });
        })
        .then((updatedUser) => {
            if (updatedUser) {
                alert("Update successful!");
                if (user.username !== updatedUser.username) {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }
                setUser(updatedUser);
            }
        })
        .catch((error) => { 
            alert("Update failed: " + error.message);
        });
    };

    const handleRemoveFavorite = (movieId) => {
        fetch(`${API_URL}/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            if (response.ok) {
                const UpdatedUser = {
                    ...user,
                    favoriteMovies: user.favoriteMovies.filter((id) => id !== movieId),
                };
                setUser(UpdatedUser);
            }
        });   
    };  

    const deleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            fetch(`${API_URL}/users/${user.username}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                if (response.ok) {
                    setUser(null);
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-view">
            <Row>
                <Col md={12} className="mt-3 mb-5">
                    <h3>Favorite Movies</h3>
                    <Row>
                        {favoriteMovies.length === 0 ? (
                            <Col>
                                <p className="text-muted mt-3">You haven't added any movies to Favorites yet</p>
                            </Col>
                        ) : (
                            favoriteMovies.map((movie) => (
                                <Col className="mb-4" key={movie._id} xs={6} md={3} lg={2}>
                                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                        <div className="favorite-poster-wrapper">
                                            <img
                                                src={movie.imagePath}
                                                alt={movie.title}
                                                className="favorite-poster-img"
                                            />
                                        </div>
                                    </Link>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-danger mt-2 p-0"
                                        onClick={() => handleRemoveFavorite(movie._id)}
                                        style={{ textDecoration: "none", fontSize: "1rem"}}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            ))
                        )}
                    </Row> 
                </Col> 
                <Col md={12}>
                    <hr />
                    <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-3 custom-tabs">
                        <Tab eventKey="info" title="User Profile">
                            <div className="mt-3">
                                <UserInfo username={user.username} email={user.email} />
                            </div>
                        </Tab>
                        <Tab eventKey="edit" title="Edit Settings">
                            <br />
                            <div className="mt-3">
                                <UpdateUser
                                    user={user}
                                    token={token}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="danger" title="Account Actions">
                            <div className="mt-4 pt-3">
                                <h3 className="text-danger">Danger Zone</h3>
                                <br />
                                <p>Deleting your account is permanent and cannot be undone.</p>
                                <Button variant="danger" onClick={deleteAccount}>
                                    Delete My Account
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>    
        </div>
    );
};

ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
};