import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const HamburgerMenu = ({ setUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <div>
            {!isOpen && (<button className="menu-button" onClick={toggleMenu}>☰</button>)}
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✖</button>
                <nav className="menu-nav">
                    <ul className="top-links">
                        <li><Link to="/" onClick={closeMenu}>🏠 HomePage</Link></li>
                        <li><Link to="/profile" onClick={closeMenu}>👤 Personal Area</Link></li>
                        <li><Link to="/taskPath" onClick={closeMenu}>📋 Task Management</Link></li>
                        <li><Link to="#" onClick={closeMenu}>📦 Vendors</Link></li>
                        <li><Link to="/checklist" onClick={closeMenu}>✔️ Check List</Link></li>
                        <li><Link to="/emergency" onClick={closeMenu}>📞 Emergency Planner</Link></li>
                        <li><Link to="/chat" onClick={closeMenu}>💬 Chat</Link></li>
                    </ul>
                    <ul className="bottom-links">
                        <li>
                            <Logout setUser={setUser} onClick={closeMenu} />
                        </li>
                        <li><Link to="/settings" onClick={closeMenu}>⚙️ Setting</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
