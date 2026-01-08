import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export const UpdateUser = ({ user, onUpdate }) => { 
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthDate: user.birthDate ? user.birthDate.split('T')[0] : "" 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleReset = () => {
        setFormData({
            username: user.username,
            email: user.email,
            password: "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            birthDate: user.birthDate ? user.birthDate.split('T')[0] : "" 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    useEffect(() => {
        setFormData({
            username: user.username,
            email: user.email,
            password: "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            birthDate: user.birthDate ? user.birthDate.split('T')[0] : "" 
        });
    }, [user]);

    return (
        <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h4>Update Profile Information</h4>
            <br />
            <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="username"
                    minLength="6"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Form.Text muted>6+ characters, no emojis</Form.Text>
            </Form.Group>

            <br />  

            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label> 
                <Form.Control
                    size="lg" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} 
                    required
                />
            </Form.Group>

            <br />

            <Form.Group controlId="formPassword" title="mb-3">
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control
                    size="lg"
                    type="password"
                    name="password"       
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"            
                    minLength="10" 
                />
                <Form.Text className="text-muted">
                    Must be 10+ characters, no spaces or emojis
                </Form.Text>
            </Form.Group>

            <br />  

            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="formFirstName">
                        <Form.Label className="fw-bold">First Name</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formLastName">
                        <Form.Label className="fw-bold">Last Name:</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
                <Col>
                    <Form.Group controlId="formBirthDate" className="mb-3">
                        <Form.Label className="fw-bold">Birth Date</Form.Label>
                        <Form.Control
                            size="lg"
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <Button variant="primary" type="submit">Save Changes
                </Button>
                <Button variant="outline-danger" type="button" onClick={handleReset}>Reset to Original
                </Button>
            </div>
            <br />
        </Form>
    );
};