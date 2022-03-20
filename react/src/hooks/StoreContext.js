import React, {useContext, createContext, useEffect, useState} from 'react';
import {useUsers} from "./usersHook";
import {useUser} from "./userHook";
import {useTweets} from "./tweetsHook";
import {useTweet} from "./tweetHook";

const StoreContext = createContext(null);

export const StoreProvider = ({children}) => {
    const [users, getUsers] = useUsers();
    const [user, register, login, logout] = useUser();
    const [tweets, getTweets] = useTweets();
    const [tweetState, createTweet, editTweet, removeTweet, setDefaultTweetState] = useTweet();

    const [userId, setUserId] = useState(user.id);
    const [tweetStateSuccess, setTweetStateSuccess] = useState(tweetState.success);

    useEffect(() => {
        if (+user.id >= 0 && userId !== user.id && !users.find(userFromList => userFromList.id === user.id)) {
            setUserId(user.id);
            getUsers();
        }
    }, [user, users]);

    useEffect(() => {
        setTweetStateSuccess(tweetState.success);

        if (tweetState.success && !tweetStateSuccess) {
            getTweets();
        }
    }, [tweetState, setDefaultTweetState]);

    const storeState = {
        data: {
            users,
            user,
            tweets,
            tweetState
        },
        actions: {
            getUsers,
            register,
            login,
            logout,
            getTweets,
            createTweet,
            editTweet,
            removeTweet,
            setDefaultTweetState
        }
    };

    return (
        <StoreContext.Provider value={storeState}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);