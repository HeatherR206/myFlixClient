import React, { useState, useEffect } from "react";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { API_URL } from "../../config";
import { Form, Button, Row, Col, InputGroup, ProgressBar } from "react-bootstrap";

const LIMITS = {
    username: 25,
    email: 45,
    password: 30,
    firstName: 22,
    lastName: 30,
};

export const UpdateUser = () => {
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch();
    const { authFetch, user } = useApi();
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username ?? "",
        email: user?.email ?? "",
        password: "",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
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
        setTouched({ ...touched, [name]: true });
    };

    const handleReset = () => {
        setFormData({
            username: user?.username ?? "",
            email: user?.email ?? "",
            password: "",
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            birthDate: user?.birthDate ? user.birthDate.split("T")[0] : "",
        });
        setTouched({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

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

                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 4000);

                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(setUser(updatedUser));

                setFormData((prev) => ({ ...prev, password: "" }));
                setTouched({});
            } else {
                throw new Error("Update failed. Please check your connection.");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username ?? "",
                email: user.email ?? "",
                password: "",
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
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
                            <div className="d-flex justify-content-between">
                                <Form.Label className="fw-bold text-muted small text-uppercase">Username</Form.Label>
                                {touched.username && (
                                    <small className={formData.username.length >= LIMITS.username ? "text-danger" : "text-muted"}>
                                        {formData.username.length}/{LIMITS.username}
                                    </small>
                                )}
                            </div>
                            <Form.Control
                                type="text"
                                name="username"
                                className="w-ch-username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength="6"
                                maxLength={LIMITS.username}
                            />
                            <Form.Text muted>Min 6 characters.</Form.Text>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label className="fw-bold text-muted small text-uppercase">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                className="w-ch-email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formPassword" size="lg" className="mb-3">
                    {formData.password.length > 0 && (
                        <small className="text-muted">
                            {formData.password.length}/{LIMITS.password}
                        </small>
                    )}
                    <Form.Label className="fw-bold text-muted small text-uppercase">New Password</Form.Label>
                    <InputGroup className="w-ch-password">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current"
                            minLength="10"
                        />
                        <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="eye-toggle">
                            <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                        </Button>
                    </InputGroup>
                    {formData.password.length > 0 && (
                        <div className="mt-2">
                            <ProgressBar now={strength} variant={getVariant()} style={{ height: "8px" }} animated={strength < 100} />
                            <small className={`text-${getVariant()} fw-bold`}>
                                {strength <= 25 && "Weak"}
                                {strength > 25 && strength <= 75 && "Moderate"}
                                {strength === 100 && "Strong - Secure!"}
                            </small>
                        </div>
                    )}
                    <Form.Text className="text-muted">Min 10 characters.</Form.Text>
                </Form.Group>

                <hr className="my-4 text-muted" />

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formFirstName">
                            <div className="d-flex justify-content-between">
                                <Form.Label className="fw-bold text-muted small text-uppercase">First Name</Form.Label>
                                {touched.firstName && (
                                    <small className="text-muted">
                                        {formData.firstName.length}/{LIMITS.firstName}
                                    </small>
                                )}
                            </div>
                            <Form.Control
                                type="text"
                                name="firstName"
                                className="w-ch-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                maxLength={LIMITS.firstName}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formLastName">
                            <div className="d-flex justify-content-between">
                                <Form.Label className="fw-bold text-muted small text-uppercase">Last Name</Form.Label>
                                {touched.lastName && (
                                    <small className="text-muted">
                                        {formData.lastName.length}/{LIMITS.lastName}
                                    </small>
                                )}
                            </div>
                            <Form.Control
                                type="text"
                                name="lastName"
                                className="w-ch-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                maxLength={LIMITS.lastName}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBirthDate">
                            <Form.Label className="fw-bold text-muted small text-uppercase">Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                className="w-ch-date"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {updateSuccess && (
                    <div className="alert alert-success border-0 shadow-sm d-flex align-items-center mb-3" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <div>
                            <strong>Success!</strong> Your profile has been updated.
                        </div>
                    </div>
                )}
                <div className="d-flex gap-2 justify-content-between mt-4">
                    <Button
                        variant="outline-danger"
                        type="button"
                        onClick={handleReset}
                        className="btn-sm fw-semibold px-2 border-0 rounded-pill"
                        style={{ fontSize: "0.8rem" }}
                    >
                        Reset
                    </Button>
                    <Button variant="primary" type="submit" className="save-btn px-4 glow-on-hover rounded-pill" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
};
