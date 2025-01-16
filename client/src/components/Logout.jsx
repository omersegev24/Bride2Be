import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);

        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            🚪 Logout
        </button>
    );
};

export default Logout;
