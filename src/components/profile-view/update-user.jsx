import React, { useState, useEffect } from "react";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { API_URL } from "../../config";
import { Form, Button, Row, Col, InputGroup, ProgressBar } from "react-bootstrap";

export const UpdateUser = () => {
    const dispatch = useDispatch();
    const { authFetch, user } = useApi();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
        password: "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        birthDate: user?.birthDate ? user.birthDate.split("T")[0] : "",
    });

    const calculateStrength = (pwd) => {
        let score = 0;
        if (!pwd) return 0;
        if (pwd.length >= 10) score += 25;
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 25;
        if (/[0-9]/.test(pwd)) score += 25;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
        return score;
    };

    const strength = calculateStrength(formData.password);

    const getVariant = () => {
        if (strength <= 25) return "danger";
        if (strength <= 75) return "warning";
        return "success";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            username: user.username,
            email: user.email,
            password: "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { ...formData };
        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        try {
            const response = await authFetch(`${API_URL}/users/${user.username}`, {
                method: "PUT",
                body: JSON.stringify(dataToSend),
            });

            if (response && response.ok) {
                const updatedUser = await response.json();
                alert("Profile updated successfully!");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));
                setFormData((prev) => ({ ...prev, password: "" }));
            } else if (response) {
                throw new Error("Update failed");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                password: "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
            });
        }
    }, [user]);

    return (
        <div className="p-2">
            <Form className="mt-3" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label className="fw-bold text-muted small text-uppercase">
                                Username
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength="6"
                            />
                            <Form.Text muted>Min 6 characters</Form.Text>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label className="fw-bold text-muted small text-uppercase">
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formPassword" size="lg" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">
                        New Password
                    </Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current"
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
                    {formData.password.length > 0 && (
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
                        Use uppercase, numberes, and symbols. Min 10 characters.
                    </Form.Text>
                </Form.Group>

                <hr className="my-4 text-muted" />

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="fw-bold text-muted small text-uppercase">
                                First Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formLastName">
                            <Form.Label className="fw-bold text-muted small text-uppercase">
                                Last Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBirthDate" className="mb-4">
                            <Form.Label className="fw-bold text-muted small text-uppercase">
                                Birth Date
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" className="glow-on-hover">
                    Save Changes
                </Button>
                <div>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        type="button"
                        onClick={handleReset}
                        className="w-100 px-4 border-0"
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};
