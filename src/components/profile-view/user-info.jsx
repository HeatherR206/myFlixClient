
import React from "react";
import { useApi } from "../../hooks/useApi";
import { ListGroup, Card } from "react-bootstrap";


export const UserInfo = () => {
    const { user } = useApi();

    if (!user) return null;

    

    return (
        <Card className="border-0 bg-transparent">
            <Card.Body className="p-0">
                <ListGroup variant="flush" className="rounded shadow-sm">
                    <ListGroup.Item className="py-3">
                        <h4 className="fw-bold mb-3">Profile Details</h4>
                        <p className="fw-bold fs-5 mb-1">{user.username}</p>
                        <p className="fw-bold text-muted small mb-0">EMAIL: {user.email}</p>
                    </ListGroup.Item>

                    {(user.firstName || user.lastName) && (
                        <ListGroup.Item className="py-3">
                            <span className="fw-bold text-muted small text-uppercase">Full Name</span>
                            <p className="mb-0 fs-5">
                                {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                            </p>
                        </ListGroup.Item>
                    )}

                    {user.birthDate && (
                        <ListGroup.Item className="py-3">
                            <span className="fw-bold text-muted small text-uppercase">Birth Date</span>
                            <p className="mb-0 fs-5">
                                {new Date(user.birthDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                })}
                            </p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};