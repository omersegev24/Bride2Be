import React from "react";

function UserProfile({ user }) {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-picture" alt="profile"/>
                <h1>{`${user.partnerOneName} & ${user.partnerTwoName}`}</h1>
                <h2>{user.username}</h2>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Wedding Date:</strong> {new Date(user.weddingDate).toLocaleDateString()}</p>
                <p><strong>Couple Type:</strong> {user.coupleType}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
            <button className="edit-profile-button">Edit Profile</button>
        </div>
    );
}


export default UserProfile;
