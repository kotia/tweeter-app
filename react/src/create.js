import * as React from "react";
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';
import {Card, CardActions, CardHeader, CardContent} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


import {createTweet, defaultStateTweet} from "./actions.js";

class CreateTweetContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: ""
        };

        this.actions = {
            onCreateTweet: this.onCreateTweet.bind(this),
            onEditText: this.onEditText.bind(this),
            onDefaultState: this.onDefaultState.bind(this)
        };
    }

    onCreateTweet() {
        this.props.onCreateTweet(this.props.user.id, this.state.text);
    }

    onEditText(e) {
        this.setState({text: e.target.value});
    }

    onDefaultState() {
        this.props.onDefaultState();
    }

    render() {
        return (
            <CreateTweet actions={this.actions} tweet={this.props.tweet} />
        );
    }
}

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardHeader>Create new tweet!</CardHeader>
                <CardContent>
                    <TextField hintText="Tweet Field"
                               multiLine={true}
                               rows={3}
                               onChange={this.props.actions.onEditText}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        disabled={this.props.tweet.requestProcess}
                        onClick={this.props.actions.onCreateTweet} >Publish</Button>
                </CardActions>

                <Snackbar
                    open={this.props.tweet.success}
                    message="Tweet created!"
                    autoHideDuration={4000}
                    onRequestClose={this.props.actions.onDefaultState}
                />

            </Card>
        )

    }
}

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

