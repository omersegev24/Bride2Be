import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        coupleType: "BrideAndGroom",
        role: "Bride",
        partnerOneName: "",
        partnerTwoName: "",
        email: "",
        phone: "",
        username: "",
        weddingDate: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                const user = { ...data.user };
                user.password = "*******";
                localStorage.setItem("user", JSON.stringify(user));
                alert("Registration successful!");
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="login-register">
            <form className="form" onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="couple-type">
                    <button
                        type="button"
                        className={`couple-button ${
                            formData.coupleType === "BrideAndGroom" ? "active" : ""
                        }`}
                        onClick={() => setFormData({ ...formData, coupleType: "BrideAndGroom" })}
                    >
                        👰🤵
                    </button>
                    <button
                        type="button"
                        className={`couple-button ${
                            formData.coupleType === "BrideAndBride" ? "active" : ""
                        }`}
                        onClick={() => setFormData({ ...formData, coupleType: "BrideAndBride" })}
                    >
                        👰👰
                    </button>
                    <button
                        type="button"
                        className={`couple-button ${
                            formData.coupleType === "GroomAndGroom" ? "active" : ""
                        }`}
                        onClick={() => setFormData({ ...formData, coupleType: "GroomAndGroom" })}
                    >
                        🤵🤵
                    </button>
                </div>
                <div className="name-input">
                    <input
                        type="text"
                        name="partnerOneName"
                        placeholder={
                            formData.coupleType === "BrideAndBride"
                                ? "Bride 1's Name"
                                : formData.coupleType === "GroomAndGroom"
                                ? "Groom 1's Name"
                                : "Bride's Name"
                        }
                        value={formData.partnerOneName || ""}
                        onChange={handleChange}
                        required
                    />
                    <span className="and-symbol">&</span>
                    <input
                        type="text"
                        name="partnerTwoName"
                        placeholder={
                            formData.coupleType === "BrideAndBride"
                                ? "Bride 2's Name"
                                : formData.coupleType === "GroomAndGroom"
                                ? "Groom 2's Name"
                                : "Groom's Name"
                        }
                        value={formData.partnerTwoName || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="role-container">
                    <h2>I'm the:</h2>
                    <div className="role-selection">
                        <input
                            type="radio"
                            id="bride"
                            name="role"
                            value="Bride"
                            checked={formData.role === "Bride"}
                            onChange={handleChange}
                        />
                        <label htmlFor="bride" className="role-label">
                            <div className="icon bride-icon">👰</div>
                            Bride
                        </label>

                        <input
                            type="radio"
                            id="groom"
                            name="role"
                            value="Groom"
                            checked={formData.role === "Groom"}
                            onChange={handleChange}
                        />
                        <label htmlFor="groom" className="role-label">
                            <div className="icon groom-icon">🤵</div>
                            Groom
                        </label>

                        <input
                            type="radio"
                            id="other"
                            name="role"
                            value="Other"
                            checked={formData.role === "Other"}
                            onChange={handleChange}
                        />
                        <label htmlFor="other" className="role-label">
                            <div className="icon other-icon">👤</div>
                            Other
                        </label>
                    </div>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="weddingDate"
                    placeholder="Wedding Date"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    required
                />
                {error && <div className="error-message error">{error}</div>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
