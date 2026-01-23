import React, { useState, useEffect } from "react";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { API_URL } from "../../config";

import { Form, Button, Row, Col } from "react-bootstrap";

export const UpdateUser = () => { 
    const dispatch = useDispatch();
    const { authFetch, user } = useApi(); 

    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
        password: "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        birthDate: user?.birthDate ? user.birthDate.split('T')[0] : "" 
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
                setFormData(prev => ({...prev, password: ""}));
            } else if (response) {
                throw new Error("Update failed");
            }
        } catch(error) {
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
                birthDate: user.birthDate ? user.birthDate.split('T')[0] : "" 
            });
        }
    }, [user]);

    return (
        <Form onSubmit={handleSubmit} className="p-4 border rounded bg-dark">
            <h4><span className="fw-bold mb-3">Edit Profile</span></h4>
            <br />
            <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label className="fw-bold text-muted small text-uppercase">Username</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="username"
                    minLength="6"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Form.Text muted>Min 6 characters</Form.Text>
            </Form.Group>

            <br />  

            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="fw-bold text-muted small text-uppercase">Email</Form.Label> 
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
                <Form.Label className="fw-bold text-muted small text-uppercase">New Password</Form.Label>
                <Form.Control
                    size="lg"
                    type="password"
                    name="password"       
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"            
                    minLength="10" 
                />
                <Form.Text className="text-muted">Min 10 characters</Form.Text>
            </Form.Group>

            <br />  

            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="formFirstName">
                        <Form.Label className="fw-bold text-muted small text-uppercase">First Name</Form.Label>
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
                        <Form.Label className="fw-bold text-muted small text-uppercase">Last Name:</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            
                <Col>
                    <Form.Group controlId="formBirthDate" className="mb-3">
                        <Form.Label className="fw-bold text-muted small text-uppercase">Birth Date</Form.Label>
                        <Form.Control
                            size="lg"
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                </Row>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <Button variant="primary" type="submit">Save Changes</Button>
                <Button variant="outline-danger" type="button" onClick={handleReset}>Reset to Original</Button>
            </div>
        </Form>
    );
};