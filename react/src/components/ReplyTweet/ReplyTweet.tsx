import {ChangeEvent, FC, memo, useCallback, useState} from "react";
import {Button, CardActions, TextField} from "@mui/material";
import styles from './ReplyTweet.module.scss';
import {useTweetQuery} from "../../hooks/useTweetQuery.ts";
import {useUser} from "../../hooks/useUser.ts";

interface IReplyTweetProps {
    parentId: string;
    close: () => void;
}
const ReplyTweetContainer: FC<IReplyTweetProps> = ({parentId, close}) => {
    //const tweets = useTweetsStore((state) => state.tweets);
    //const users = useUsersStore((state) => state.users);
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
        addTweet({text: tweetText, userId: user?.id || '', parentId});
        onClose();
    }, [addTweet, onClose, parentId, tweetText, user?.id]);

    return <CardActions>
        <TextField className={styles.textField} label='Reply' value={tweetText} onChange={editText} />
        <Button disabled={!tweetText} onClick={postTweet} variant='contained'>Post reply</Button>
        <Button onClick={onClose}>Cancel</Button>
    </CardActions>;
};

export const ReplyTweet = memo(ReplyTweetContainer);
