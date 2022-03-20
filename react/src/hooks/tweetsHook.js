import {useState} from "react";

export function useTweets() {
    const [tweets, setTweets] = useState([]);


    const getTweets = async () => {
        const response = await fetch('/api/getTweets', {method: 'GET'});
        const tweetsResponse = await response.json();

        if (tweetsResponse.length) {
            setTweets(tweetsResponse.map(tweet => ({
                id: tweet.id,
                userId: tweet.userId,
                tweetId: tweet.tweetId,
                timestamp: tweet.timestamp,
                text: tweet.text
            })));
        }
    }

    return [tweets, getTweets];
}