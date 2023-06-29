import React, { useState, useEffect } from 'react';
import { AppRouter } from './AppRouter';
import { UserContext } from './UserContext';
import Loader from "./components/general/Loader";
import { decodeJWTFechaexp } from './components/utils/Utils';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';

export const MainApp = () => {
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [expiredToken, setExpiredToken] = useState(false);

    useEffect(() => {
        const configuration = localStorage.getItem('token');

        if (configuration) {
            setIsLogged(true);
            const expiration = decodeJWTFechaexp(configuration);
            const fechaActual = new Date();
            if ((expiration.exp < Date.now() / 1000) || (expiration.iat > fechaActual.setMinutes(fechaActual.getMinutes() + 5) / 1000)) {
                localStorage.clear();
                setExpiredToken(true);
            } else {
                setExpiredToken(false);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ State: user }}>
            <Loader />
            {(expiredToken||!isLogged) &&
               <Login />
            }
            {isLogged && !expiredToken &&
                <AppRouter />
            }

        </UserContext.Provider>
    );
};
