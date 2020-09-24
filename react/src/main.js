import * as React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from "./store.js";

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import App from "./app.js";
import {CreateTweetContainerCon as CreateTweetContainer} from "./create.js";
import {LoginContainerCon as LoginContainer} from "./login.js";
import {TweetAndRepliesContainerCon as TweetAndRepliesContainer} from "./tweet-and-replies.js";
import {TweetsContainerCon as TweetsContainer} from "./tweets.js";
import {UsersContainerCon as UsersContainer} from "./users.js";

const history = createBrowserHistory();

const theme = createMuiTheme();

export default () => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter history={history}>
                <div>
                     <App />
                     <Switch>
                     <Route exact path="/" component={UsersContainer} />
                     <Route path="/login" component={LoginContainer} />
                     <Route path="/create" component={CreateTweetContainer} />
                     <Route path="/tweets/:userId" component={TweetsContainer} />
                     <Route path="/tweet/:tweetId" component={TweetAndRepliesContainer} />
                     <Redirect from="/tweets" to="/" />
                     <Redirect from="/tweet" to="/" />
                     </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);

