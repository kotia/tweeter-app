import * as React from "react";
import {connect} from "react-redux";

import Button from '@mui/material/Button';
import {Card, CardActions, CardContent, CardHeader} from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';


import {createTweet, defaultStateTweet} from "./actions.js";
import {useState} from "react";

const CreateTweetContainer = (props) => {
    const [text, setText] = useState('');

    const onCreateTweet = () => props.onCreateTweet(props.user.id, text);
    const onEditText = (e) => setText(e.target.value);
    const onDefaultState = () => props.onDefaultState();

    return <CreateTweet tweet={props.tweet} onCreateTweet={onCreateTweet} onEditText={onEditText} onDefaultState={onDefaultState} />
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
    user: store.user,
    tweet: store.tweet,
    tweets: store.tweets
});

const mapDispatchToProps = (dispatch) => ({
    onCreateTweet: (id, text) => dispatch(createTweet(id, text)),
    onDefaultState: () => dispatch(defaultStateTweet())
});

export const CreateTweetContainerCon = connect(mapStateToProps, mapDispatchToProps)(CreateTweetContainer);

