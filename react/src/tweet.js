import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

import {Card, CardActions, CardContent, CardHeader, Collapse, Tooltip} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ActionDelete from '@mui/icons-material/Delete';
import EditorModeEdit from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import {useStore} from "./hooks/StoreContext";

export const TweetContainer = ({tweetId}) => {

    const {data: {
        user,
        users,
        tweets,
        tweetState
    }, actions: {
        createTweet,
        editTweet,
        removeTweet,
        setDefaultTweetState
    }} = useStore();

    const tweetContent = tweets.find(tweet => tweet.id === tweetId);
    const author = users.find(user => +user.id === +tweetContent?.userId);
    const childTweets = tweets.filter(tweet => tweetId === tweet.tweetId);

    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editedText, setEditedText] = useState(tweetContent?.text);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        const tweetContent = tweets.find(tweet => tweet.id === tweetId);
        setEditedText(tweetContent?.text);
    }, [tweets, tweetId, setEditedText]);

    const onDefaultState = () => {
        setReplyText('');
        setDefaultTweetState();
    }
    const onToggleExpand = () => setIsExpanded(isExpanded => !isExpanded);
    const onRemove = () => removeTweet(tweetId);
    const onToggleEdit = () => setIsEditing(isEditing => !isEditing);
    const onEditEdit = (e) => setEditedText(e.target.value);
    const onEdit = () => {
        setIsEditing(false);
        editTweet(tweetId, editedText);
    };
    const onEditReply = (e) => setReplyText(e.target.value);
    const onReply = () => createTweet(user.id, replyText, tweetId);

    return author ? (
        <Tweet tweet={tweetContent}
               tweetState={tweetState}
               childTweets={childTweets}
               editing={isEditing}
               editedText={editedText}
               expanded={isExpanded}
               user={user}
               author={author}
               onDefaultState={onDefaultState}
               onToggleExpand={onToggleExpand}
               onRemove={onRemove}
               onToggleEdit={onToggleEdit}
               onEditEdit={onEditEdit}
               onEdit={onEdit}
               onEditReply={onEditReply}
               onReply={onReply}
        />
    ) : null;

};

const Tweet = (props) => {
    let isAuthor = props.user.id === props.tweet.userId;

    return (
        <Card
            className="users-card">
            <CardHeader title={(
                <>
                    tweet #<Link to={"/tweet/" + props.tweet.id}>{props.tweet.id}</Link>
                    <br/>
                    By <Link to={"/tweets/" + props.author.id}>{props.author.username}</Link>
                </>
            )}/>

            <CardActions>
                <Tooltip title="Delete this tweet">
                        <span>
                            <IconButton
                                onClick={props.onRemove}
                                size='small'
                                disabled={!isAuthor || props.tweetState.editing}>
                            <ActionDelete/>
                        </IconButton>
                        </span>
                </Tooltip>

                <Tooltip title="Edit tweet">
                        <span>
                            <IconButton
                                onClick={props.onToggleEdit}
                                size='small'
                                disabled={!isAuthor || props.tweetState.editing}>
                        <EditorModeEdit/>
                    </IconButton>
                        </span>

                </Tooltip>
            </CardActions>
            <CardContent>
                {props.editing ? (
                    <div>
                        <TextField label="Edit Tweet"
                                   onChange={props.onEditEdit}
                                   multiline={true}
                                   rows={3}>{props.editedText}</TextField> <br/>
                        <Button disabled={props.tweetState.editing}
                                variant='contained'
                                onClick={props.onEdit}>Save Edited</Button>
                    </div>
                ) : (<div className="tweet-text">{props.tweet.text}</div>)}
            </CardContent>

            <CardActions>
                <Button
                    variant='contained'
                    onClick={props.onToggleExpand}>reply</Button>
            </CardActions>
            <Collapse in={props.expanded}>
                <CardContent>
                    <TextField label="Reply Field"
                               onChange={props.onEditReply}
                               multiline={true}
                               rows={3}/>
                </CardContent>
                <CardContent>
                    <Button
                        disabled={props.tweetState.editing}
                        onClick={props.onReply}
                        variant='outlined'>Post reply</Button>
                </CardContent>
            </Collapse>

            {props.childTweets.map(childTweet =>
                <CardContent key={childTweet.id}>
                    <TweetContainer tweetId={childTweet.id}/>
                </CardContent>
            )}

            <Snackbar
                open={props.tweetState.success}
                message="Tweet added!"
                autoHideDuration={4000}
                onClose={props.onDefaultState}
            />

        </Card>
    );
};