import {useState} from "react";

const getDefaultUser = () => ({
    id: -1,
    requestProcess: false,
    fail: false,
    errorText: ''
});

export function useUser() {
    const [user, setUser] = useState({
        ...getDefaultUser(),
        id: window.localStorage.getItem('userId') || -1
    });

    const register = async (username, password) => {
        setUser(currentUser => ({
            ...currentUser,
            requestProcess: true,
            fail: false
        }));

        const response = await fetch('/api/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const registerResponse = await response.json();

        if (registerResponse.result === 'error') {
            setUser(currentUser => ({
                ...currentUser,
                requestProcess: false,
                fail: true,
                errorText: registerResponse.desc
            }));
        } else {
            setUser({
                id: registerResponse.id,
                requestProcess: false,
                fail: false
            });

            window.localStorage.setItem('userId', registerResponse.id);
        }
    };

    const login = async (username, password) => {
        setUser(currentUser => ({
            ...currentUser,
            requestProcess: true,
            fail: false
        }));

        const response = await fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const loginResponse = await response.json();

        if (loginResponse.result === 'error') {
            setUser(currentUser => ({
                ...currentUser,
                requestProcess: false,
                fail: true,
                errorText: loginResponse.desc
            }));
        } else {
            setUser(currentUser => ({
                ...currentUser,
                id: loginResponse.id,
                requestProcess: false,
                fail: false
            }));

            window.localStorage.setItem('userId', loginResponse.id);
        }
    };

    const logout = () => {
        setUser(currentUser => ({
            ...currentUser,
            id: -1,
            requestProcess: false,
            fail: false
        }));

        window.localStorage.removeItem('userId');
    }

    return [user, register, login, logout];
}