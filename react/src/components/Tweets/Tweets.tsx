import {memo, useMemo} from "react";
import {useTweetsStore} from "../../hooks/useTweetsStore.ts";
import styles from './Tweets.module.scss';
import {Tweet} from "../Tweet/Tweet.tsx";
import {NewTweet} from "../NewTweet/NewTweet.tsx";
import {useUser} from "../../hooks/useUser.ts";

const TweetsContainer = () => {
    const tweets = useTweetsStore((state) => state.tweets);
    const { user } = useUser();
    
    const rootTweets = useMemo(() => tweets.filter((tweet) => !tweet.parentTweetId), [tweets]);
    
    return <div className={styles.tweetsContainer}>
        {!!user && <NewTweet />}
        {rootTweets.map((tweet) => <Tweet id={tweet.id} key={tweet.id} />)}
    </div>;
};

export const Tweets = memo(TweetsContainer);
