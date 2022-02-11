import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { RegistroApp } from './components/Registro/RegistroApp';
import Login from './components/Login/Login';
import EmailConfirmation from './components/Registro/EmailConfirmation';
import Publication from './components/Publication/Publication';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/register" element={<RegistroApp />} />
            </Routes>
            <Routes>
                <Route path="/emailconfirmation" element={<EmailConfirmation />} />
            </Routes>
            <Routes>
                <Route path="/publication" element={<Publication />} />
            </Routes>
        </Router >
    );
};
