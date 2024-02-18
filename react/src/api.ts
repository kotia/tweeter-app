import {QueryClient} from "@tanstack/react-query";
import {
    IEditTweetRequest,
    INewTweetRequest,
    ITweetResponse,
    IUserCredentials,
    IUserResponse
} from "./types/types.ts";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const queryClient = new QueryClient();
export const getTweetsRequest = async (): Promise<ITweetResponse[]> => {
    const response = await fetch('/api/getTweets', {method: 'get'});
    return await response.json();
}

export const addTweetRequest = async ({
    userId, text, parentId
                               }: INewTweetRequest) => {
    const response = await fetch('/api/addTweet', {
        method: 'post',
        headers,
        body: JSON.stringify({
            userId,
            text,
            tweetId: parentId
        })
    });

    if (response.ok) {
        return await response.json();
    }

    const errtext = await response.text();
    return Promise.reject(errtext);
}

export const editTweetRequest = async ({id, text}: IEditTweetRequest) => {
    const response = await fetch('/api/editTweet', {
        method: 'post',
        headers,
        body: JSON.stringify({
            id,
            text
        })
    });

    if (response.ok) {
        return await response.json();
    }

    const errtext = await response.text();
    return Promise.reject(errtext);
}

export const removeTweetRequest = async ({id}: {id: string}) => {
    const response = await fetch('/api/removeTweet', {
        method: 'post',
        headers,
        body: JSON.stringify({
            id
        })
    });

    if (response.ok) {
        return await response.json();
    }

    const text = await response.text();
    return Promise.reject(text);
}

export const getUsersRequest = async (): Promise<IUserResponse[]> => {
    const response = await fetch('/api/getUsers', {method: 'get'});
    return await response.json();
}

export const userRegisterRequest = async ({username, password}: IUserCredentials) => {
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

    if (response.ok) {
        return await response.json();
    }

    const text = await response.text();
    return Promise.reject(text);
}

export const userLoginRequest = async ({username, password}: IUserCredentials)=> {
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

    if (response.ok) {
        return await response.json();
    }

    const errtext = await response.text();
    return Promise.reject(errtext);
}