import {useState} from "react";

const defaultTweetState = () => ({
    editing: false,
    deleting: false,
    adding: false,
    error: false,
    success: false,
    errorText: ""
});

export function useTweet() {
    const [tweetState, setTweetState] = useState(defaultTweetState());

    const createTweet = async (userId, text, parentTweetId) => {
        setTweetState({
            ...defaultTweetState(),
            adding: true
        });

        await fetch('/api/addTweet', {
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

        setTweetState({
            ...defaultTweetState(),
            adding: false,
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
            editing: false,
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
            deleting: false,
            success: true
        });
    };

    const setDefaultTweetState = () => setTweetState(defaultTweetState());

    return [tweetState, createTweet, editTweet, removeTweet, setDefaultTweetState];
}