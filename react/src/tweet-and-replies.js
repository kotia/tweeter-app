import * as React from "react";
import {useParams} from "react-router-dom";
import {TweetContainer} from "./tweet.js";
import {useStore} from "./hooks/StoreContext";

export const TweetAndRepliesContainer = () => {
    const params = useParams();
    const {data: {user, tweets}} = useStore();

    const tweet = tweets.find((tweet) => tweet.id === params.tweetId);

    return (
        <TweetAndReplies user={user}
                         tweetId={tweet?.id}
        />
    );
}

const TweetAndReplies = (props) => {

    return (
        <div>
            {props.tweetId ? <TweetContainer
                tweetId={props.tweetId}/> : <h2>Tweet not found!</h2>}
        </div>
    );
}
