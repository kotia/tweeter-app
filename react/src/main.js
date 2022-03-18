import * as React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {store} from "./store.js";

import {createTheme, ThemeProvider} from '@mui/material/styles';

import App from "./app.js";
import {CreateTweetContainerCon as CreateTweetContainer} from "./create.js";
import {LoginContainerCon as LoginContainer} from "./login.js";
import {TweetAndRepliesContainerCon as TweetAndRepliesContainer} from "./tweet-and-replies.js";
import {TweetsContainerCon as TweetsContainer} from "./tweets.js";
import UsersContainer from "./users";
import {StoreProvider} from "./StoreContext";

const history = createBrowserHistory();

const theme = createTheme({});

export default () => (
    <StoreProvider>
        <Provider store={store}>
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
        </Provider>
    </StoreProvider>
);

