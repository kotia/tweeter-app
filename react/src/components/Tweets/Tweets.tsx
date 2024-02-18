import {memo, useMemo} from "react";
import {useTweetsStore} from "../../hooks/useTweetsStore.ts";
import styles from './Tweets.module.scss';
import {Tweet} from "../Tweet/Tweet.tsx";
import {NewTweet} from "../NewTweet/NewTweet.tsx";

const TweetsContainer = () => {
    const tweets = useTweetsStore((state) => state.tweets);
    
    const rootTweets = useMemo(() => tweets.filter((tweet) => !tweet.parentTweetId), [tweets]);
    
    return <div className={styles.tweetsContainer}>
        <NewTweet />
        {rootTweets.map((tweet) => <Tweet id={tweet.id} key={tweet.id} />)}
    </div>;
};

export const Tweets = memo(TweetsContainer);
