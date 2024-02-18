import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userLoginRequest, userRegisterRequest} from "../api";
import {useCallback, useMemo} from "react";
import {useShallow} from "zustand/react/shallow";
import {useUsersStore} from "./useUsersStore";
import {IUserCredentials, UserError} from "../types/types.ts";
import {useLocalStorage} from "usehooks-ts";

export const useUserQuery = () => {
    const [, setUserId] = useLocalStorage('userId', '');
    const {login, logout, setError} = useUsersStore(useShallow(({login, logout, setError}) => ({login, logout, setError})));
    const queryClient = useQueryClient();

    const loginCall = useMutation<{id: string}, string, IUserCredentials>({
        mutationFn: userLoginRequest,
        onSuccess: (data) => {
            setUserId(data.id);
            login(data.id);
        },
        onError: (err) => {
            setError(UserError.Login, err);
        }
    });

    const registerCall = useMutation<{id: string}, string, IUserCredentials>({
        mutationFn: userRegisterRequest,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ['users']});
            const id = String(data.id);
            setUserId(id);
            login(id);
        },
        onError: (err) => {
            console.log(err);
            setError(UserError.Register, err);
        }
    });
    
    const logoutCall = useCallback(() => {
        logout();
        setUserId('');
    }, [logout, setUserId]);
    
    return useMemo(() => ({
        login: loginCall.mutate,
        register: registerCall.mutate,
        logout: logoutCall,
    }), [loginCall.mutate, logoutCall, registerCall.mutate]);
};