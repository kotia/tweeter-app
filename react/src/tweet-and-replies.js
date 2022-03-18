import * as React from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {TweetContainerCon as TweetContainer} from "./tweet.js";

const TweetAndRepliesContainer = (props) => {
    const params = useParams();
    const mainTweet = props.tweets.find((tweet) => tweet.id === params.tweetId);

    return (
        <TweetAndReplies user={props.user}
                         mainTweet={mainTweet}
        />
    );
}

const TweetAndReplies = (props) => {

    const isMainTweet = props.mainTweet;

    return (
        <div>
            {isMainTweet ? <TweetContainer
                user={props.user}
                tweet={props.mainTweet}/> : <h2>Tweet not found!</h2>}
        </div>
    );
}

let mapStateToProps = (store) => ({
    user: store.user,
    tweets: store.tweets
});

export const TweetAndRepliesContainerCon = connect(mapStateToProps)(TweetAndRepliesContainer);