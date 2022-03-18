import {useState} from "react";

export function useUsers() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const usersResponse = await fetch('/api/getUsers', {method: 'GET'});
        const usersList = await usersResponse.json();
        setUsers(usersList);
    };

    return [users, getUsers];
}