import React, {useState} from "react";
import {connect} from "react-redux";
import {Card, CardActions, CardContent, CardHeader, TextField, Snackbar, Button} from '@mui/material';

import {createTweet, defaultStateTweet} from "./actions.js";
import {useStore} from "./StoreContext";

const CreateTweetContainer = (props) => {
    const {data: {user}} = useStore();
    const [text, setText] = useState('');

    const onCreateTweet = () => props.onCreateTweet(user.id, text);
    const onEditText = (e) => setText(e.target.value);
    const onDefaultState = () => props.onDefaultState();

    return <CreateTweet
        tweet={props.tweet}
        onCreateTweet={onCreateTweet}
        onEditText={onEditText}
        onDefaultState={onDefaultState}
    />
};

const CreateTweet = (props) => (
            <Card>
                <CardHeader title="Create new tweet!"/>
                <CardContent>
                    <TextField label="Tweet Field"
                               multiline={true}
                               rows={3}
                               onChange={props.onEditText}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        disabled={props.tweet.requestProcess}
                        onClick={props.onCreateTweet}>Publish</Button>
                </CardActions>

                <Snackbar
                    open={props.tweet.success}
                    message="Tweet created!"
                    autoHideDuration={4000}
                    onRequestClose={props.onDefaultState}
                />

            </Card>
        );

const mapStateToProps = (store) => ({
    tweet: store.tweet,
    tweets: store.tweets
});

const mapDispatchToProps = (dispatch) => ({
    onCreateTweet: (id, text) => dispatch(createTweet(id, text)),
    onDefaultState: () => dispatch(defaultStateTweet())
});

export const CreateTweetContainerCon = connect(mapStateToProps, mapDispatchToProps)(CreateTweetContainer);

