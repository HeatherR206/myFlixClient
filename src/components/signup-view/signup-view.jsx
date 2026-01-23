import { useState } from "react";
import { useNavigate } from "react-router-dom";import { API_URL } from "../../config";
import { Button, Form }from "react-bootstrap";

export const SignupView = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate
        };
        
        fetch(`${API_URL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup was successful. Please login.");
                navigate("/login");

            } else {
                response.json().then(errorData => {
                    const message = errorData.errors ? errorData.errors.map(e => e.msg).join(", ") : errorData;
                    alert(`Signup failed: ${message}`);
                });
            } 
            
        }).catch(e => {
                console.error("Signup error:", e);
                alert("Something went wrong");
        });
    };

    return (
        <div>    
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formSignupUsername">
                    <Form.Label className="fw-bold">Username (required): </Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="6"
                    />
                    <Form.Text className="text-muted">Min 6 characters.</Form.Text>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formSignupPassword">
                    <Form.Label className="fw-bold">Password (required): </Form.Label>
                    <Form.Control
                        size="lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="10"
                    />
                    <Form.Text className="text-muted">Min 10 characters.</Form.Text>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formSignupEmail">
                    <Form.Label className="fw-bold">Email (required): </Form.Label> 
                    <Form.Control
                        size="lg" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formSignupFirstName">
                    <Form.Label className="fw-bold">First Name:</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mt-3"controlId="formSignupLastName">
                    <Form.Label className="fw-bold">Last Name:</Form.Label>
                    <Form.Control 
                        size="lg"
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mt-3" controlId="formSignupBirthDate">
                    <Form.Label className="fw-bold">Birth Date:</Form.Label>
                    <Form.Control
                        size="lg"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </Form.Group>
                <Button className="btn-lg mt-4 w-100" variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>                
    );
};