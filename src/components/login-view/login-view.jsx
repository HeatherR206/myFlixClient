import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { API_URL } from "../../config";
import { useApi } from "../../hooks/useApi";

export const LoginView = () => {
    const { login } = useApi();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event, manualUser, manualPass) => {
        if (event) event.preventDefault();

        const userToLogin = manualUser || username;
        const passToLogin = manualPass || password;

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userToLogin, password: passToLogin }),
        })
            .then((response) => {
                if (response.ok) return response.json();
                if (response.status === 401) throw new Error("Invalid username or password");
                throw new Error("Something went wrong on the server");
            })
            .then((data) => {
                if (data.user && data.token) {
                    login(data.user, data.token);
                    navigate("/");
                }
            })
            .catch((e) => alert(e.message));
    };

    const onGuestLogin = () => {
        const guestUser = "myFlixGuest";
        const guestPass = "My-flix_Movies8647!";

        handleSubmit(null, guestUser, guestPass);
    };

    return (
        <div className="login-container py-4">
            <h3 className="display-6 fw-bold text-center mb-2 text-primary">Welcome back!</h3>
            <Form onSubmit={handleSubmit} className="m-4">
                <Form.Group controlId="formUsername">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Username</Form.Label>
                    <Form.Control
                        size="lg"
                        className="w-ch-username mb-3"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="6"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" size="lg" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Password</Form.Label>
                    <InputGroup size="lg" className="w-ch-password">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="10"
                        />
                        <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="eye-toggle">
                            <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Button className="login-btn btn-lg mt-5 w-100 rounded-pill glow-on-hover" variant="primary" type="submit">
                    Login
                </Button>

                <div className="text-center my-3 text-muted rounded pill">or</div>

                <Button className="guest-login btn-lg w-100 mb-2 rounded-pill glow-on-hover" variant="outline-info" onClick={onGuestLogin}>
                    Guest Login
                </Button>
            </Form>
        </div>
    );
};
