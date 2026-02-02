import { useState } from "react";
import { Button, Form, Row, Col, InputGroup, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export const SignupView = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();

    const calculateStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 10) score += 25; // Length requirement
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 25; // Mixed case
        if (/[0-9]/.test(pwd)) score += 25; // Numbers
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25; // Special chars
        return score;
    };

    const strength = calculateStrength(password);
    const getVariant = () => {
        if (strength <= 25) return "danger";
        if (strength <= 75) return "warning";
        return "success";
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = { username, password, email, firstName, lastName, birthDate };

        fetch(`${API_URL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (response.ok) {
                    alert("Signup successful! Please login.");
                    navigate("/login");
                } else {
                    const errorData = await response.json();
                    const message = errorData.errors
                        ? errorData.errors.map((e) => e.msg).join(", ")
                        : "Signup failed";
                    alert(message);
                }
            })
            .catch((e) => alert("Something went wrong"));
    };

    return (
        <div className="signup-container py-3">
            <h2 className="text-center mb-3 text-primary">Join myFlix</h2>
            <h5 className="text-center mb-4 text-dark">Create an Account</h5>
            <Form
                onSubmit={handleSubmit}
                className="signup-form mx-auto"
                style={{ maxWidth: "800px" }}
            >
                <Row>
                    <Col md={12} className="mb-3">
                        <Form.Group controlId="formSignupUsername">
                            <Form.Label className="fw-bold">Username</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="6"
                                placeholder="Choose a unique username"
                            />
                            <Form.Text className="small text-muted">
                                Minimum 6 characters.
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                        <Form.Group controlId="formSignupPassword">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <InputGroup size="lg">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="10"
                                    placeholder="Create a strong password"
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                                </Button>
                            </InputGroup>
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <ProgressBar
                                        now={strength}
                                        variant={getVariant()}
                                        style={{ height: "8px" }}
                                        animated={strength < 100}
                                    />
                                    <small className={`text-${getVariant()} fw-bold`}>
                                        {strength <= 25 && "Weak"}
                                        {strength > 25 && strength <= 75 && "Moderate"}
                                        {strength === 100 && "Strong - Secure!"}
                                    </small>
                                </div>
                            )}
                            <Form.Text className="text-muted">
                                Use uppercase, numbers, and symbols. Minimum 10 characters.
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formSignupFirstName">
                            <Form.Label className="fw-bold">First Name</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formSignupLastName">
                            <Form.Label className="fw-bold">Last Name</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formSignupEmail">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control
                                size="lg"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formSignupBirthDate">
                            <Form.Label className="fw-bold">Birth Date</Form.Label>
                            <Form.Control
                                size="lg"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button className="btn-lg mt-5 glow-on-hover" variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
};
