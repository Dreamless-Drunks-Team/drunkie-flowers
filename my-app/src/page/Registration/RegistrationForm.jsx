import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.scss";
import { Navigate } from "react-router-dom";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleRegistration = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        axios
            .post("http://localhost:5000/user/register", {
                name: name,
                phone: phone,
                email: email,
                password: password,
            })
            .then(() => setRedirectToHome(true))
            .catch((err) => console.error(err));
    };

    if (redirectToHome) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="registration-page">
            <h1>Реєстрація</h1>
            <form className="registration-form" onSubmit={handleRegistration}>
                <div className="form-group">
                    <label className="registration-label">Ім'я</label>
                    <input
                        type="text"
                        className="registration-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="registration-label">Телефон</label>
                    <input
                        type="phone"
                        className="registration-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="registration-label">Пошта</label>
                    <input
                        type="email"
                        className="registration-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="registration-label">Пароль</label>
                    <input
                        type="password"
                        className="registration-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="registration-label">
                        Підтвердження паролю
                    </label>
                    <input
                        type="password"
                        className="registration-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="registration-button">
                    Зареєструватися
                </button>
            </form>
            {passwordMismatch && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => setPasswordMismatch(false)}
                        >
                            &times;
                        </span>
                        <p>Пароль і підтвердження пароля не збігаються!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
