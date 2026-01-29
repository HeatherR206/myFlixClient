import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/filter";
import { clearToken } from "../../redux/reducers/token";
import { useApi } from "../../hooks/useApi";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

export const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const { user } = useApi();

    const onLoggedOut = () => {
        dispatch(setUser(null));
        dispatch(clearToken());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const clearFilter = () => dispatch(setFilter(""));

    return (
        <Navbar className="navbar" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={clearFilter}>myFlix Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {user && (
                        <div className="mx-auto w-50">
                            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                                <div className="position-relative w-100">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search movies..."
                                        value={filter}
                                        className="search-input pe-5"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(setFilter(value));
                                            
                                            const isHome = window.location.pathname === "/";
                                            const isProfile = window.location.pathname.includes("/users/");

                                            if (!isHome && !isProfile) {
                                                navigate("/");
                                            }
                                        }}
                                    />
                                    {filter && (
                                        <Button
                                            variant="link"
                                            className="position-absolute end-0 top-50 text-muted pe-3 translate-middle-y text-decoration-none"
                                            onClick={clearFilter}
                                            style={{ zIndex: 5, fontSize: "0.8rem" }}
                                        >
                                            <i className="bi bi-x-circle-fill"></i>
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </div>
                    )}

                    <Nav className="ms-auto">
                        {!user ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/" onClick={clearFilter}>Home</Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.username}`} onClick={clearFilter}>
                                    {user.username}
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};