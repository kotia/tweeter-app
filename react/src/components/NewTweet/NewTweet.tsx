import {ChangeEvent, FC, memo, useCallback, useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from './NewTweet.module.scss';
import {useTweetQuery} from "../../hooks/useTweetQuery.ts";
import {useUser} from "../../hooks/useUser.ts";

const NewTweetContainer: FC = () => {
    const { user } = useUser();
    const {addTweet} = useTweetQuery();
    const [tweetText, setTweetText] = useState('');

    const editText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTweetText(e.target.value);
    }, []);

    const onClose = useCallback(() => {
        setTweetText('');
        close();
    }, [close]);

    const postTweet = useCallback(() => {
        addTweet({text: tweetText, userId: user?.id || ''});
        onClose();
    }, [addTweet, onClose, tweetText, user?.id]);

    return <div className={styles.container}>
        <TextField className={styles.textField} label='Text' value={tweetText} onChange={editText} />
        <Button disabled={!tweetText} onClick={postTweet} variant='contained'>Post tweet!</Button>
    </div>;
};

export const NewTweet = memo(NewTweetContainer);
