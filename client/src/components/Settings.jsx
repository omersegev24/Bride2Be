import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaShieldAlt, FaQuestionCircle, FaUserPlus, FaBell, FaCog, FaImage } from "react-icons/fa";

const Settings = ({ user }) => {
    const navigate = useNavigate();

    const settingsOptions = [
        { id: 1, icon: <FaLock />, label: "Privacy" },
        { id: 2, icon: <FaUser />, label: "Account", onClick: () => navigate("/account") },
        { id: 3, icon: <FaShieldAlt />, label: "Security" },
        { id: 4, icon: <FaQuestionCircle />, label: "About" },
        { id: 5, icon: <FaUserPlus />, label: "Invite Friends" },
        { id: 6, icon: <FaImage />, label: "Change Background" },
        { id: 7, icon: <FaBell />, label: "Notifications" },
        { id: 8, icon: <FaCog />, label: "Admin Management" },
  ];

  return (
    <div>
        <div className="settings-page">
        <h1>Settings</h1>
      <div className="settings-search">
        <input type="text" placeholder="Search" />
      </div>
      <ul className="settings-list">
        {settingsOptions.map((option) => (
          <li key={option.id} className="settings-item" onClick={option.onClick}>
            <span className="settings-icon">{option.icon}</span>
            <span className="settings-label">{option.label}</span>
            <span className="settings-arrow">&gt;</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Settings;
