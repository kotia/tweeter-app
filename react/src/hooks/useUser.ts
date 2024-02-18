import {useLocalStorage} from "usehooks-ts";
import {useUsersStore} from "./useUsersStore.ts";
import {useMemo} from "react";

export const useUser = () => {
    const [userId] = useLocalStorage('userId', '');
    const users = useUsersStore((state) => state.users);
    const user = useMemo(() => users.find((user) => user.id === userId), [userId, users]);
    return { user };
};