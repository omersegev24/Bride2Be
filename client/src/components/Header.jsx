import React from "react";
import PropTypes from "prop-types";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate } from "react-router-dom";


function Header({ user, setUser }) {
    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    return (
        <header className="header">
            <HamburgerMenu setUser={setUser}/>
            <h1 className="header-title">{user.partnerOneName} & {user.partnerTwoName}</h1>
            <div className="header-image" onClick={goToHome}></div>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Header;
