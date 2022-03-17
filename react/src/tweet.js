import React, {useState} from "react";
import {editTweet, removeTweet, createTweet, defaultStateTweet} from "./actions.js";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'

import {Card, CardActions, CardHeader, CardContent, Collapse} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ActionDelete from '@mui/icons-material/Delete';
import EditorModeEdit from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

const TweetContainer = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editedText, setEditedText] = useState(props.tweet.text);
    const [replyText, setReplyText] = useState("");

    const onDefaultState = () => {
        setReplyText('');
        props.defaultState(props.tweet.id);
    }
    const onToggleExpand = () => setIsExpanded(isExpanded => !isExpanded);
    const onRemove = () => props.onRemoveTweet(props.tweet.id);
    const onToggleEdit = () => setIsEditing(isEditing => !isEditing);
    const onEditEdit = (e) => setEditedText(e.target.value);
    const onEdit = () => {
        setIsEditing(false);
        props.onEditTweet(props.tweet.id, editedText);
    };
    const onEditReply = (e) => setReplyText(e.target.value);
    const onReply = () => props.onReplyTweet(props.user.id, replyText, props.tweet.id);

    const author = props.users.find((user) => user.id === props.tweet.userId);
    const childTweets = props.tweets.filter(tweet => props.tweet.id === tweet.tweetId);

    return (
        <Tweet tweet = {props.tweet}
               childTweets={childTweets}
               editing = {isEditing}
               editedText = {editedText}
               expanded = {isExpanded}
               user = {props.user}
               author = {author}
               onDefaultState={onDefaultState}
               onToggleExpand={onToggleExpand}
               onRemove={onRemove}
               onToggleEdit={onToggleEdit}
               onEditEdit={onEditEdit}
               onEdit={onEdit}
               onEditReply={onEditReply}
               onReply={onReply}
        />
    );

};

const Tweet = (props) => {
        let isAuthor = props.user.id === props.tweet.userId;

        return (
            <Card
                className="users-card">
                <CardHeader title={(
                    <>
                        tweet #<Link to={"/tweet/" + props.tweet.id}>{props.tweet.id}</Link>
                        <br />
                        By <Link to={"/tweets/" + props.author.id}>{props.author.username}</Link>
                    </>
                )} />

                <CardActions>
                    <IconButton
                        onClick={props.onRemove}
                        size='small'
                        disabled={!isAuthor || props.tweet.isEditing}
                        tooltip="Delete this tweet">
                        <ActionDelete />
                    </IconButton>
                    <IconButton
                        onClick={props.onToggleEdit}
                        size='small'
                        disabled={!isAuthor || props.tweet.isEditing}
                        tooltip="Edit tweet">
                        <EditorModeEdit />
                    </IconButton>
                </CardActions>
                <CardContent>
                    {props.editing ? (
                        <div>
                            <TextField label="Edit Tweet"
                                       onChange={props.onEditEdit}
                                       multiline={true}
                                       rows={3} >{props.editedText}</TextField> <br />
                            <Button disabled={props.tweet.editing}
                                    variant='contained'
                                    onClick={props.onEdit} >Save Edited</Button>
                        </div>
                    ) : (<div className="tweet-text">{props.tweet.text}</div>)}
                </CardContent>

                <CardActions>
                    <Button
                        variant='contained'
                        onClick={props.onToggleExpand} >reply</Button>
                </CardActions>
                <Collapse in = {props.expanded}>
                        <CardContent>
                            <TextField label="Reply Field"
                                       onChange={props.onEditReply}
                                       multiline={true}
                                       rows={3} />
                        </CardContent>
                        <CardContent>
                            <Button
                                disabled={props.tweet.editing}
                                onClick={props.onReply}
                                variant='outlined' >Post reply</Button>
                        </CardContent>
                </Collapse>

                {props.childTweets.map(childTweet =>
                    <CardContent key={childTweet.id}>
                        <TweetContainerCon tweet={childTweet} />
                    </CardContent>
                )}


                <Snackbar
                    open={props.tweet.success}
                    message="Tweet added!"
                    autoHideDuration={4000}
                    onClose={props.onDefaultState}
                />

                <Snackbar
                    open={props.tweet.edit_success}
                    message="Tweet edited!"
                    autoHideDuration={4000}
                    onClose={props.onDefaultState}
                />
            </Card>
        );
    };

let mapTweetStateToProps = (store) => ({
    tweets: store.tweets,
    users: store.users,
    user: store.user
});

let mapTweetDispatchToProps = (dispatch) => ({
    onRemoveTweet: (id) => dispatch(removeTweet(id)),
    onEditTweet: (id, text) => dispatch(editTweet(id, text)),
    onReplyTweet: (userId, text, tweetId) => dispatch(createTweet(userId, text, tweetId)),
    defaultState: (id) => dispatch(defaultStateTweet(id))
});

export const TweetContainerCon = connect(mapTweetStateToProps, mapTweetDispatchToProps)(TweetContainer);