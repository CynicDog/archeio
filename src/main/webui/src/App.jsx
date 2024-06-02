import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainApp from "./MainApp.jsx";
import Login from "./Login.jsx";

const App = () => {

    const [upn, setUpn] = useState(sessionStorage.getItem("upn"));

    return (
        <Routes>
            <Route path="/" element={upn !== null && upn !== undefined ? <MainApp /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUpn={setUpn} />} />
        </Routes>
    );
};

export default App;
