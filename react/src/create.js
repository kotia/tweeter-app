import React, {useState} from "react";
import {Card, CardActions, CardContent, CardHeader, TextField, Snackbar, Button} from '@mui/material';

import {useStore} from "./hooks/StoreContext";

export const CreateTweetContainer = () => {
    const {data: {user, tweetState}, actions: {createTweet, setDefaultTweetState}} = useStore();
    const [text, setText] = useState('');

    const onCreateTweet = () => createTweet(user.id, text);
    const onEditText = (e) => setText(e.target.value);

    return <CreateTweet
        tweet={tweetState}
        onCreateTweet={onCreateTweet}
        onEditText={onEditText}
        onDefaultState={setDefaultTweetState}
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
                        disabled={props.tweet.adding}
                        onClick={props.onCreateTweet}>Publish</Button>
                </CardActions>

                <Snackbar
                    open={props.tweet.addSuccess}
                    message="Tweet created!"
                    autoHideDuration={4000}
                    onClose={props.onDefaultState}
                />

            </Card>
        );

