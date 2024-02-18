import {useQuery} from "@tanstack/react-query";
import {getTweetsRequest} from "../api.ts";
import {useTweetsStore} from "./useTweetsStore.ts";
import {useEffect} from "react";
import {TweetError} from "../types/types.ts";
import {useShallow} from "zustand/react/shallow";

export const useFetchTweetsQuery = () => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['tweets'],
        queryFn: getTweetsRequest,
        select: (data) => data.map((tweet) => ({...tweet, parentTweetId: tweet.tweetId}))
    });

    const {fetchTweets, setError, setLoading} = useTweetsStore(useShallow(({fetchTweets, setError, setLoading}) => ({fetchTweets, setError, setLoading})));

    useEffect(() => {
        if (data) {
            fetchTweets(data);
        }

        if (isError) {
            setError(TweetError.Fetch, '0', '');
        }
        
        setLoading(isLoading);
    }, [data, fetchTweets, isError, isLoading, setError, setLoading]);
};