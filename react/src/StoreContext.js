import React, {useContext, createContext} from 'react';
import {useUsers} from "./usersHook";

const StoreContext = createContext(null);

export const StoreProvider = ({children}) => {
    const [users, getUsers] = useUsers();

    const storeState = {
        data: {
            users
        },
        actions: {
            getUsers
        }
    };

    return (
        <StoreContext.Provider value={storeState}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);