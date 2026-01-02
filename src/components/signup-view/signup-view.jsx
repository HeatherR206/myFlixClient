import { useState } from "react";
import { API_URL } from "../../config";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
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
                alert("Signup was successful");
                window.location.reload();
            } else {
                response.text().then(text => alert(`Signup failed: ${text}`));
            }
        }).catch(e => {
                console.error("Signup error:", e);
                alert("Something went wrong");
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
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
                <Form.Text id="usernameHelpBlock" muted>Your username must contain at least 6 characters. Emojis are not allowed.</Form.Text>
            </Form.Group>
            <br />            
            <Form.Group controlId="formSignupPassword">
                <Form.Label className="fw-bold">Password (required): </Form.Label>
                <Form.Control
                    size="lg"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="10"
                />
                <Form.Text id="passwordHelpBlock" muted>Your password must contain at least 10 characters. Spaces and emojis are not allowed.</Form.Text>
            </Form.Group>
            <br />            
            <Form.Group controlId="formSignupEmail">
                <Form.Label className="fw-bold">Email (required): </Form.Label> 
                <Form.Control
                    size="lg" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Form.Text id="emailHelpBlock" muted>Example: name@email.com</Form.Text> 
            </Form.Group>
            <br />            
            <Form.Group controlId="formSignupFirstName">
                <Form.Label className="fw-bold">First Name:</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="formSignupLastName">
                <Form.Label className="fw-bold">Last Name:</Form.Label>
                <Form.Control
                    size="lg"
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="formSignupBirthDate">
                <Form.Label className="fw-bold">Birth Date:</Form.Label>
                <Form.Control
                    size="lg"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <br />
            </Form.Group>
            <br />
            <Button className="btn-lg" variant="primary" type="submit">Signup</Button>
            <br />
        </Form>
    );
};