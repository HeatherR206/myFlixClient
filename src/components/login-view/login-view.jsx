import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL } from "../../config";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("Invalid username or password");
            } else {
                throw new Error("Something went wrong on the server");
            }
        })
        .then((data) => {
            console.log("Login response: ", data);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        })
        .catch((e) => {
            alert(e.message);
        });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label className="fw-bold">Username:</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    value={username}
                    minLength="6"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Label className="fw-bold">Password:</Form.Label>
                <Form.Control
                    size="lg"
                    type="password" 
                    value={password}
                    minLength="10"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
            </Form.Group>
            <Button className="btn-lg" variant="primary" type="submit">
                Login
            </Button>
            <br />
        </Form>
    );
};