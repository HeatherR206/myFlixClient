import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../../config";

export const LoginView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            if (data.user && data.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                
                dispatch(setUser(data.user));
                dispatch(setToken(data.token));

                navigate("/");
            }
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
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="6"
                    />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Label className="fw-bold">Password:</Form.Label>
                <Form.Control
                    size="lg"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="10"
                />
            </Form.Group>
            <br />
            <Button className="btn-lg" variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};