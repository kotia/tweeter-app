import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addTweetRequest, editTweetRequest, removeTweetRequest} from "../api";
import {useMemo} from "react";
import {useShallow} from "zustand/react/shallow";
import {IEditTweetRequest, INewTweetRequest, TweetError} from "../types/types";
import {useTweetsStore} from "./useTweetsStore";

export const useTweetQuery = () => {
    const {setError} = useTweetsStore(useShallow(({setError}) => ({setError})));
    const queryClient = useQueryClient();

    const newTweetCall = useMutation<unknown, string, INewTweetRequest>({
        mutationFn: addTweetRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tweets']});
        },
        onError: (err) => {
            setError(TweetError.Add, '', err);
        }
    });

    const editTweetCall = useMutation<unknown, string, IEditTweetRequest>({
        mutationFn: editTweetRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tweets']});
        },
        onError: (err, creds) => {
            setError(TweetError.Edit, creds.id, err);
        }
    });

    const deleteTweetCall = useMutation<unknown, string, { id: string }>({
        mutationFn: removeTweetRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tweets']});
        },
        onError: (err, creds) => {
            setError(TweetError.Delete, creds.id, err);
        }
    });
    
    return useMemo(() => ({
        addTweet: newTweetCall.mutate,
        editTweet: editTweetCall.mutate,
        deleteTweet: deleteTweetCall.mutate
    }), [deleteTweetCall.mutate, editTweetCall.mutate, newTweetCall.mutate]);
};