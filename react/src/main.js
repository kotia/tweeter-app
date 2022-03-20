import * as React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import App from "./app.js";
import {CreateTweetContainer} from "./create.js";
import {LoginContainer} from "./login.js";
import {TweetAndRepliesContainer} from "./tweet-and-replies.js";
import {TweetsContainer} from "./tweets.js";
import UsersContainer from "./users";
import {StoreProvider} from "./hooks/StoreContext";

const history = createBrowserHistory();

const theme = createTheme({});

export default () => (
    <StoreProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter history={history}>
                    <div>
                        <App/>
                        <Routes>
                            <Route path="/" element={<UsersContainer/>}/>
                            <Route path="login" element={<LoginContainer/>}/>
                            <Route path="create" element={<CreateTweetContainer/>}/>
                            <Route path="tweets/:userId" element={<TweetsContainer/>}/>
                            <Route path="tweet/:tweetId" element={<TweetAndRepliesContainer/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
    </StoreProvider>
);

