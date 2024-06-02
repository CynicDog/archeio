import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setUpn}) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform login logic here
        // If login is successful, redirect to the main app
        // TODO: "master" hardcoded for temp value

        sessionStorage.setItem("upn", "master")
        setUpn("master")

        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="btn btn-outline-secondary" onClick={handleLogin}>
                Login
            </div>
        </div>
    );
};

export default Login;
