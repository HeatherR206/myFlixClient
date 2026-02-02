import React from "react";
import { useApi } from "../../hooks/useApi";
import { ListGroup } from "react-bootstrap";

export const UserInfo = () => {
    const { user } = useApi();

    if (!user) return null;

    return (
        <div className="p-2">
            <h5 className="fw-extra-bold mb-4">My Profile</h5>
            <ListGroup variant="flush" className="custom-profile-list rounded border shadow-sm">
                <ListGroup.Item>
                    <strong>Username:</strong> {user.username}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                {(user.firstName || user.lastName) && (
                    <ListGroup.Item>
                        <strong>Full Name:</strong>{" "}
                        {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                    </ListGroup.Item>
                )}
                {user.birthDate && (
                    <ListGroup.Item>
                        <strong>Birth Date: </strong>{" "}
                        {new Date(user.birthDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            timeZone: "UTC",
                        })}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};
