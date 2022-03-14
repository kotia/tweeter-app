import * as React from "react";
import {editTweet, removeTweet, createTweet, defaultStateTweet} from "./actions.js";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'

import {Card, CardActions, CardHeader, CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ActionDelete from '@mui/icons-material/Delete';
import EditorModeEdit from '@mui/icons-material/Edit';
import AvRepeat from '@mui/icons-material/Repeat';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

class TweetContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            expanded: false,
            editedText: this.props.tweet.text,
            replyText: ""
        };

        this.actions = {
            onToggleExpand: this.toggleExpand.bind(this),
            onRemove: this.onRemove.bind(this),
            onToggleEdit: this.onToggleEdit.bind(this),
            onEditEdit: this.onEditEdit.bind(this),
            onEdit: this.onEdit.bind(this),
            onEditReply: this.onEditReply.bind(this),
            onReply: this.onReply.bind(this),
            onDefaultState: this.defaultState.bind(this)
        };

        this.author = this.props.users.find((user) => user.id === this.props.tweet.userId);
    }

    defaultState() {
        this.props.defaultState(this.props.tweet.id);
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }

    onRemove() {
        this.props.onRemoveTweet(this.props.tweet.id);
    }

    onToggleEdit() {
        this.setState({editing: !this.state.editing});
    }

    onEditEdit(e) {
        this.setState({editedText: e.target.value});
    }

    onEdit() {
        this.setState({editing: false});
        this.props.onEditTweet(this.props.tweet.id, this.state.editedText);
    }

    onEditReply(e) {
        this.setState({replyText: e.target.value});
    }

    onReply() {
        this.props.onReplyTweet(this.props.user.id, this.state.replyText, this.props.tweet.id);
    }

    render() {
        let repliedText;

        if (this.props.tweet.tweetId) {
            let repliedTweet = this.props.tweets.find((tweet) => tweet.id === this.props.tweet.tweetId);
            if (repliedTweet) {
                repliedText = repliedTweet.text;
            }
        }

        return (
            <Tweet tweet = {this.props.tweet}
                   editing = {this.state.editing}
                   editedText = {this.state.editedText}
                   expanded = {this.state.expanded}
                   user = {this.props.user}
                   actions = {this.actions}
                   repliedText = {repliedText}
                   author = {this.author}

            />
        );
    }
}

class Tweet extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let isAuthor = this.props.user.id === this.props.tweet.userId;
        let textBlock = (
            <div className="tweet-text">{this.props.tweet.text}</div>
        );
        let rtBlock = "";

        if (this.props.repliedText) {
            rtBlock = (
                <div>
                    <AvRepeat/>
                    {this.props.repliedText}
                </div>

            );
        }

        if (this.props.editing) {
            textBlock = (
                <div>
                    <TextField hintText="Edit Tweet"
                               onChange={this.props.actions.onEditEdit}
                               multiLine={true}
                               rows={3} >{this.props.editedText}</TextField> <br />
                    <Button disabled={this.props.tweet.editing}
                            variant='contained'
                            onClick={this.props.actions.onEdit} >Save Edited</Button>
                </div>
            );
        }


        return (
            <Card
                className="users-card"
                expanded = {this.props.expanded}>
                <CardHeader>
                    <Link to={"/tweet/" + this.props.tweet.id}>tweet #{this.props.tweet.id}</Link>
                    <br />
                    <Link to={"/tweets/" + this.props.author.id}>By {this.props.author.username}</Link>

                </CardHeader>

                <CardActions>
                    <IconButton
                        onClick={this.props.actions.onRemove}
                        iconStyle={{width: '18px', height: '18px'}}
                        disabled={!isAuthor || this.props.tweet.isEditing}
                        tooltip="Delete this tweet">
                        <ActionDelete />
                    </IconButton>
                    <IconButton
                        onClick={this.props.actions.onToggleEdit}
                        iconStyle={{width: '18px', height: '18px'}}
                        disabled={!isAuthor || this.props.tweet.isEditing}
                        tooltip="Edit tweet">
                        <EditorModeEdit />
                    </IconButton>
                </CardActions>
                <CardContent>
                    {textBlock}
                    {rtBlock}
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        onClick={this.props.actions.onToggleExpand} >reply</Button>
                </CardActions>
                <CardContent expandable={true}>
                    <TextField hintText="Reply Field"
                               onChange={this.props.actions.onEditReply}
                               multiLine={true}
                               rows={3} />
                </CardContent>
                <CardActions expandable={true}>
                    <Button
                        disabled={this.props.tweet.editing}
                        onClick={this.props.actions.onReply}
                        variant='outlined' >Post reply</Button>
                </CardActions>

                <Snackbar
                    open={this.props.tweet.success}
                    message="Tweet added!"
                    autoHideDuration={4000}
                    onRequestClose={this.props.actions.onDefaultState}
                />

                <Snackbar
                    open={this.props.tweet.edit_success}
                    message="Tweet edited!"
                    autoHideDuration={4000}
                    onRequestClose={this.props.actions.onDefaultState}
                />
            </Card>
        );
    }
}

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