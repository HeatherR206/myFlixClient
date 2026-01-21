import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./nav-bar.scss";


export const NavBar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const onLoggedOut = () => {
        localStorage.clear();
        dispatch(setUser(null));
    };

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
                                    value={filter}
                                    className="search-input me-2 bg-light"
                                    aria-label="Search"
                                    onChange={(e) => dispatch(setFilter(e.target.value))}
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
                                <Nav.Link as={Link} to={`/users/${user.username}`}>Profile</Nav.Link>
                                <Nav.Link onClick={() => {
                                    dispatch(setUser(null));
                                    localStorage.clear();
                                }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};