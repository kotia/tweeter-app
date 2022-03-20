import React from "react";
import {useParams} from "react-router-dom";

import {TweetContainer} from "./tweet.js";
import {useStore} from "./hooks/StoreContext";

export const TweetsContainer = () => {
    const {userId} = useParams();
    const {data: {users, tweets}} = useStore();
    const filteredTweets = tweets.filter((tweet) => tweet.userId === userId);


    return (
        <Tweets users={users}
                tweets={filteredTweets}
        />
    );
};

class Tweets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tweetsList;

        if (!this.props.tweets.length) {
            tweetsList = <h2>Sorry, no tweets for this user!</h2>
        } else {
            tweetsList = this.props.tweets.filter(tweet => !tweet.tweetId).map((tweet) => <TweetContainer
                key={tweet.id}
                tweetId={tweet.id}
            />);
        }

        return (
            <div>
                {tweetsList}
            </div>
        );
    }
}
