import {useState} from "react";

const defaultTweetState = () => ({
    editing: false,
    deleting: false,
    adding: false,
    error: false,
    editSuccess: false,
    deleteSuccess: false,
    addSuccess: false,
    success: false,
    errorText: "",
    tweetId: -1,
    parentTweetId: -1
});

export function useTweet() {
    const [tweetState, setTweetState] = useState(defaultTweetState());

    const createTweet = async (userId, text, parentTweetId) => {
        setTweetState({
            ...defaultTweetState(),
            adding: true
        });

        const response = await fetch('/api/addTweet', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                text,
                tweetId: parentTweetId
            })
        });

        const addTweetResponse = await response.json();

        setTweetState({
            ...defaultTweetState(),
            tweetId: addTweetResponse.id,
            parentTweetId: parentTweetId || -1,
            adding: false,
            addSuccess: true,
            success: true
        });
    };

    const editTweet = async (id, text) => {
        setTweetState({
            ...defaultTweetState(),
            editing: true
        });

        await fetch('/api/editTweet', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                text
            })
        });

        setTweetState({
            ...defaultTweetState(),
            tweetId: id,
            editing: false,
            editSuccess: true,
            success: true
        });
    };

    const removeTweet = async (id) => {
        setTweetState({
            ...defaultTweetState(),
            deleting: true
        });

        await fetch('/api/removeTweet', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        });

        setTweetState({
            ...defaultTweetState(),
            tweetId: id,
            deleting: false,
            deleteSuccess: true,
            success: true
        });
    };

    const setDefaultTweetState = () => setTweetState(defaultTweetState());

    return [tweetState, createTweet, editTweet, removeTweet, setDefaultTweetState];
}