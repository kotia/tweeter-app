import {create} from "zustand";
import {IUsersState, UserError} from "../types/types.ts";

export const useUsersStore = create<IUsersState>((set) => ({
    id: '',
    users: [],
    error: false,
    loading: false,
    errorText: '',
    errorType: UserError.Login,
    fetchUsers: (users) => set((state) => ({
        ...state,
        error: false,
        users,
    })),
    login: (id) => set((state) => ({
        ...state,
        error: false,
        id,
    })),
    logout: () => set((state) => ({
        ...state,
        error: false,
        name: '',
        id: ''
    })),
    setError: (type, text) => set((state) => ({
        ...state,
        error: true,
        errorText: text,
        errorType: type,
    })),
    setLoading: (loading) => set((state) => ({
        ...state,
        loading,
    })),
}));