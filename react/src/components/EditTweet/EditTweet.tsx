import {ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from './EditTweet.module.scss';
import {useTweetQuery} from "../../hooks/useTweetQuery.ts";
import {useTweetsStore} from "../../hooks/useTweetsStore.ts";

interface IReplyTweetProps {
    id: string;
    close: () => void;
}
const EditTweetContainer: FC<IReplyTweetProps> = ({id, close}) => {
    const tweets = useTweetsStore((state) => state.tweets);
    const {editTweet} = useTweetQuery();
    const [tweetText, setTweetText] = useState('');
    const tweet = useMemo(() => tweets.find((tweet) => tweet.id === id), [id, tweets]);
    
    useEffect(() => {
        tweet && setTweetText(tweet.text);
    }, [tweet, tweet?.text]);

    const editText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTweetText(e.target.value);
    }, []);

    const onClose = useCallback(() => {
        setTweetText(tweet?.text || '');
        close();
    }, [close, tweet?.text]);

    const postTweet = useCallback(() => {
        editTweet({text: tweetText, id});
        onClose();
    }, [editTweet, id, onClose, tweetText]);

    return <div className={styles.container}>
        <TextField className={styles.textField} label='Tweet text' value={tweetText} onChange={editText} />
        <Button disabled={!tweetText} onClick={postTweet} variant='contained'>Finish edit</Button>
        <Button onClick={onClose}>Cancel</Button>
    </div>;
};

export const EditTweet = memo(EditTweetContainer);
