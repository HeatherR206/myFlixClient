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
            <Form.Group controlId="signUpFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="6"
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="signUpFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="10"
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="signUpFormEmail">
                <Form.Label>Email:</Form.Label> 
                <Form.Control  
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />        
            </Form.Group>
            <br />            
            <Form.Group controlId="signUpFormFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="signUpFormLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>
            <br />            
            <Form.Group controlId="signUpBirthDate">
                <Form.Label>Birth Date:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <br />
            </Form.Group>
            <Button className="btn-lg" variant="primary" type="submit">Register</Button>
            <br />
        </Form>
    );
};