export const UserInfo = ({ username, email }) => {
    return (
        <div className="mb-4 p-3 border-bottom">
            <h3>Account Details</h3>
            <br />
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
    </div>
    );
};
    
