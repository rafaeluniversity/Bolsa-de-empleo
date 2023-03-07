import React, { useState } from 'react';
import { AppRouter } from './AppRouter';
import { UserContext } from './UserContext';
import Loader from "./components/general/Loader";

export const MainApp = () => {

    const [user, setUser] = useState({});

    return (

        <UserContext.Provider value={{ State: user }}>
                  <Loader />
            <AppRouter />
        </UserContext.Provider>


    );
};


