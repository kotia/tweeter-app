import {useQuery} from "@tanstack/react-query";
import {getUsersRequest} from "../api";
import {useEffect} from "react";
import {UserError} from "../types/types";
import {useShallow} from "zustand/react/shallow";
import {useUsersStore} from "./useUsersStore";

export const useFetchUsersQuery = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['users'],
        queryFn: getUsersRequest,
        select: (data) => data.map((user) => ({...user, name: user.username}))
    });

    const {fetchUsers, setError, setLoading} = useUsersStore(useShallow(({fetchUsers, setLoading, setError}) => ({fetchUsers, setError, setLoading})));

    useEffect(() => {
        if (data) {
            fetchUsers(data);
        }

        if (isError) {
            setError(UserError.Fetch, '');
        }
        
        setLoading(isLoading);
    }, [data, fetchUsers, isError, isLoading, setError, setLoading]);
};