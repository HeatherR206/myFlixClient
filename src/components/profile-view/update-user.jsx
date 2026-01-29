import React, { useState, useEffect } from "react";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { API_URL } from "../../config";

import { Form, Button } from "react-bootstrap";

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
        <div className="p-2">
            <h5 className="fw-bold mb-4">Edit Profile</h5>
            <Form onSubmit={handleSubmit}>        
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        minLength="6"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-75"
                        required
                    />
                    <Form.Text muted>Min 6 characters</Form.Text>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" title="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="w-75"
                        minLength="10"
                    />
                    <Form.Text className="text-muted">Min 10 characters</Form.Text>
                </Form.Group>

                <hr className="my-4 text-muted" />  

                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        className="w-75"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        className="w-75"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBirthDate" className="mb-3">
                    <Form.Label className="fw-bold text-muted small text-uppercase">Birth Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        className="w-50"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="rounded-pill px-3 mb-3 w-100">Save Changes</Button>
                <Button variant="outline-danger" size="sm" type="button" onClick={handleReset} className="rounded-pill mt-2 px-3 w-100 border-1">
                    Reset
                </Button>
            </Form>
        </div>
    );
};