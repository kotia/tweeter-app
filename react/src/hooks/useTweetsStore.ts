import {create} from "zustand";
import {ITweetsState, TweetError} from "../types/types.ts";

export const useTweetsStore = create<ITweetsState>((set) => ({
    error: false,
    loading: false,
    errorText: '',
    errorId: '',
    tweets: [],
    errorType: TweetError.Edit,
    addTweet: (tweet) => set((state) => ({
        ...state,
        error: false,
        tweets: [...state.tweets, tweet],
    })),
    fetchTweets: (tweets) => set((state) => ({
        ...state,
        error: false,
        tweets,
    })),
    removeTweet: (id) => set((state) => ({
        ...state,
        error: false,
        tweets: state.tweets.filter((tweet) => tweet.id !== id),
    })),
    editTweet: (id, text) => set((state) => ({
        ...state,
        error: false,
        tweets: state.tweets.map((tweet) => tweet.id === id ? {...tweet, text} : tweet)
    })),
    setError: (type, id, text) => set((state) => ({
        ...state,
        error: true,
        errorText: text,
        errorType: type,
        errorId: id,
    })),
    setLoading: (loading) => set((state) => ({
        ...state,
        loading,
    })),
}));