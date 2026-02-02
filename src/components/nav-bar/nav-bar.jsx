import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { setFilter } from "../../redux/reducers/filter";
import { useApi } from "../../hooks/useApi";
import { Button, Container, Form, Nav, Navbar, InputGroup } from "react-bootstrap";

export const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const { user, logout } = useApi();

    const onLoggedOut = () => {
        logout();
        navigate("/login");
    };

    const clearFilter = () => dispatch(setFilter(""));

    return (
        <Navbar className="navbar" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={clearFilter}>
                    myFlix Movies
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user && (
                        <div className="mx-auto w-50">
                            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                                <InputGroup className="search-bar-custom mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search movies..."
                                        value={filter}
                                        className="pe-5"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(setFilter(value));

                                            const isHome = location.pathname === "/";
                                            const isProfile = location.pathname.includes("/users/");

                                            if (!isHome && !isProfile) {
                                                navigate("/");
                                            }
                                        }}
                                    />
                                    {filter && (
                                        <Button
                                            variant="link"
                                            className="position-absolute rounded-circle end-0 top-50 text-muted pe-3 translate-middle-y text-decoration-none"
                                            onClick={clearFilter}
                                            style={{ zIndex: 5, fontSize: "0.8rem" }}
                                        >
                                            <i className="bi bi-x-circle-fill"></i>
                                        </Button>
                                    )}
                                </InputGroup>
                            </Form>
                        </div>
                    )}

                    <Nav className="ms-auto">
                        {!user ? (
                            <>
                                <Nav.Link as={NavLink} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={NavLink}
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    onClick={clearFilter}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to={`/users/${user.username}`}
                                    onClick={clearFilter}
                                >
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
