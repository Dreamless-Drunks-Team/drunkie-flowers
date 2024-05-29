import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./../../jwt/AuthContext.jsx";
import "./LoginForm.scss";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { updateToken } = useContext(AuthContext);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [redirectToCreateAccount, setRedirectToCreateAccount] = useState(false);

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/user/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                updateToken(res.data.refresh_token);
                setRedirectToHome(true);
            })
            .catch((err) => console.error(err));
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    if (redirectToCreateAccount) {
        return <Navigate to="/register" />;
    }

    return (
        <div className="login-page">
            <h1>Увійти в особистий профіль</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Електронна пошта:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={handleShowPasswordToggle}
                        >
                            {showPassword ? "Приховати" : "Показати"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="login-btn">
                    Увійти
                </button>
                <div>
                    <button className="create-account" onClick={() => setRedirectToCreateAccount(true)}> Створити особистий акаунт </button>    
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
