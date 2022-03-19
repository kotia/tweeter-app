import React, {useContext, createContext, useEffect, useState} from 'react';
import {useUsers} from "./hooks/usersHook";
import {useUser} from "./hooks/userHook";

const StoreContext = createContext(null);

export const StoreProvider = ({children}) => {
    const [users, getUsers] = useUsers();
    const [user, register, login, logout] = useUser();

    const [userId, setUserId] = useState(user.id);

    useEffect(() => {
        if (+user.id >= 0 && userId !== user.id && !users.find(userFromList => userFromList.id === user.id)) {
            setUserId(user.id);
            getUsers();
        }
    }, [user, users]);

    const storeState = {
        data: {
            users,
            user
        },
        actions: {
            getUsers,
            register,
            login,
            logout
        }
    };

    return (
        <StoreContext.Provider value={storeState}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);