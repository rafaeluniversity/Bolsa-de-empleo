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
import ListEmpleo from './components/ListEmpleo';
import AdvancedFiltro from './components/Filtro/AdvancedFiltro';
import PerfilScreen from './screens/PerfilScreen';
import EmpleosPublicados from './screens/EmpleosPublicados';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListEmpleo />} />
            </Routes>
            {/*<Routes>
                <Route path="/login" element={<Login />} />
    </Routes>*/}
            <Routes>
                <Route path="/register" element={<RegistroApp />} />
            </Routes>
            <Routes>
                <Route path="/emailconfirmation" element={<EmailConfirmation />} />
            </Routes>
            <Routes>
                <Route path="/publication" element={<Publication />} />
            </Routes>
            <Routes>
                <Route path="/publication/:id" element={<Publication />} />
            </Routes>
            <Routes>
                <Route path="/filter" element={<AdvancedFiltro />} />
            </Routes>
            <Routes>
                <Route path="/perfil" element={<PerfilScreen />} />
            </Routes>
            <Routes>
                <Route path="/empresa/listaEmpleos" element={<EmpleosPublicados />} />
            </Routes>
        </Router >
    );
};
