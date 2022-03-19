import * as React from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {TweetContainerCon as TweetContainer} from "./tweet.js";
import {useStore} from "./StoreContext";

const TweetAndRepliesContainer = (props) => {
    const params = useParams();
    const {data: {user}} = useStore();

    const mainTweet = props.tweets.find((tweet) => tweet.id === params.tweetId);

    return (
        <TweetAndReplies user={user}
                         mainTweet={mainTweet}
        />
    );
}

const TweetAndReplies = (props) => {

    const isMainTweet = props.mainTweet;

    return (
        <div>
            {isMainTweet ? <TweetContainer
                tweet={props.mainTweet}/> : <h2>Tweet not found!</h2>}
        </div>
    );
}

let mapStateToProps = (store) => ({
    tweets: store.tweets
});

export const TweetAndRepliesContainerCon = connect(mapStateToProps)(TweetAndRepliesContainer);