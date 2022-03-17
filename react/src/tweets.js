import * as React from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

import {TweetContainerCon} from "./tweet.js";


const TweetsContainer = ({tweets, users}) => {
        const {userId} = useParams();
        const filteredTweets = tweets.filter((tweet) => tweet.userId === userId);

        return (
            <Tweets users = {users}
                    tweets = {filteredTweets}
            />
        );
    };

class Tweets extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let tweetsList;

        if (!this.props.tweets.length) {
            tweetsList = <h2>Sorry, no tweets for this user!</h2>
        } else {
            tweetsList = this.props.tweets.filter(tweet => !tweet.tweetId).map((tweet) => <TweetContainerCon
                key={tweet.id}
                tweet={tweet} />);
        }

        return (
            <div>
                {tweetsList}
            </div>
        );
    }
}

let mapStateToProps = (store) => ({
    users: store.users,
    tweets: store.tweets
});

export const TweetsContainerCon = connect(mapStateToProps)(TweetsContainer);