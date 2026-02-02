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

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
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

    return (
        <div className="login-container py-3">
            <h2 className="text-center mb-2 text-primary">Welcome to myFlix!</h2>
            <h5 className="text-center mb-4 text-dark">Please Login</h5>
            <Form onSubmit={handleSubmit} className="m-4">
                <Form.Group controlId="formUsername">
                    <Form.Label className="fw-bold">Username:</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="6"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="fw-bold mt-3">Password:</Form.Label>
                    <InputGroup>
                        <Form.Control
                            size="lg"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="10"
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ borderLeft: "none" }}
                        >
                            <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Button className="btn-lg mt-5 glow-on-hover" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};
