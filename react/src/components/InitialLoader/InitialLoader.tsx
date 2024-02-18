import {useFetchTweetsQuery} from "../../hooks/useFetchTweetsQuery.ts";
import {useFetchUsersQuery} from "../../hooks/useFetchUsersQuery.ts";
import {memo, PropsWithChildren} from "react";

const InitialLoaderContainer: React.FC<PropsWithChildren> = ({children}) => {
    useFetchTweetsQuery();
    useFetchUsersQuery();

    return <>{children}</>;
};

export const InitialLoader = memo(InitialLoaderContainer);