import {FC, memo, useCallback, useMemo, useState} from "react";
import {useTweetsStore} from "../../hooks/useTweetsStore.ts";
import {Button, Card, CardActions, CardContent, IconButton} from "@mui/material";
import styles from './Tweet.module.scss';
import {useUsersStore} from "../../hooks/useUsersStore.ts";
import {ReplyTweet} from "../ReplyTweet/ReplyTweet.tsx";
import {Edit} from "@mui/icons-material";
import {useUser} from "../../hooks/useUser.ts";
import {EditTweet} from "../EditTweet/EditTweet.tsx";
import {DeleteTweet} from "../DeleteTweet/DeleteTweet.tsx";

interface ITweetProps {
    id: string;
}
const TweetContainer: FC<ITweetProps> = ({id}) => {
    const tweets = useTweetsStore((state) => state.tweets);
    const users = useUsersStore((state) => state.users);
    const { user } = useUser();

    const [replyMode, setReplyMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    const tweet = useMemo(() => tweets.find((tweet) => tweet.id === id), [id, tweets]);
    const tweetAuthor = useMemo(() => users.find((user) => user.id === tweet?.userId), [tweet?.userId, users]);
    const tweetChildren = useMemo(() => tweets.filter((tweet) => tweet.parentTweetId === id), [id, tweets]);

    const canEdit =  user && user?.id === tweetAuthor?.id;

    const startReply = useCallback(() => {
        setReplyMode(true);
        setEditMode(false);
    }, []);

    const cancelReply = useCallback(() => {
        setReplyMode(false);
    }, []);

    const startEdit = useCallback(() => {
        setReplyMode(false);
        setEditMode(true);
    }, []);

    const cancelEdit = useCallback(() => {
        setEditMode(false);
    }, []);
    
    return <>{tweet &&
        <Card>
            <CardContent>
                <h3>#{tweet.id} by {tweetAuthor?.name}</h3>
                {!editMode && <p>{tweet.text}</p>}
                {canEdit && !editMode && <div><IconButton onClick={startEdit}><Edit /></IconButton><DeleteTweet id={tweet.id} /></div>}
                {editMode && <EditTweet id={tweet.id} close={cancelEdit} />}
            </CardContent>
            {!replyMode && !!user && <CardActions>
                <Button onClick={startReply}>Reply</Button>
            </CardActions>}
            {replyMode && <ReplyTweet parentId={id} close={cancelReply} />}
            {tweetChildren.length > 0 && <CardContent>
                <div className={styles.tweetsContainer}>{tweetChildren.map((child) => <TweetContainer key={child.id} id={child.id}/>)}</div>
            </CardContent>}
        </Card>}
        {!tweet && 'no tweet'}
    </>;
};

export const Tweet = memo(TweetContainer);
