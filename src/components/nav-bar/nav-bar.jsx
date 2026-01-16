import "./nav-bar.scss";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavBar = ({ user, onLoggedOut, onSearch }) => {
    return (
        <Navbar 
            className="navbar" 
            variant="dark" 
            expand="lg" 
            sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">myFlix Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user && (
                        <div className="mx-auto">
                            <Form className="d-flex">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Search database"
                                    className="search-input me-2 bg-light"
                                    aria-label="Search"
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                                <Button variant="outline-secondary">Search</Button>
                            </Form>
                        </div>
                    )}

                    <Nav className={`${!user ? "ms-auto" : ""}`}>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/users/${username}">Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};