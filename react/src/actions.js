export const INIT_APP = "INIT_APP";
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const RECEIVE_USERS = "";

export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT = "LOGOUT";

export const REGISTER = "REGISTER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const ADD_USER = "ADD_USER";

export const CREATE_TWEET = "CREATE_TWEET";
export const CREATE_TWEET_ERROR = "CREATE_TWEET_ERROR";
export const CREATE_TWEET_SUCCESS = "CREATE_TWEET_SUCCESS";

export const EDIT_TWEET = "EDIT_TWEET";
export const EDIT_TWEET_ERROR = "EDIT_TWEET_ERROR";
export const EDIT_TWEET_SUCCESS = "EDIT_TWEET_SUCCESS";

export const REMOVE_TWEET = "REMOVE_TWEET";
export const REMOVE_TWEET_ERROR = "REMOVE_TWEET_ERROR";
export const REMOVE_TWEET_SUCCESS = "REMOVE_TWEET_SUCCESS";

export const TWEET_DEFAULT_STATE = "TWEET_DEFAULT_STATE";

export const initApp = () => ({
    type: INIT_APP
});

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        id: user.id,
        username: user.username
    }
}

export function login(username, password) {
    return {
        type: LOGIN,
        username,
        password
    };
}

export function loginError(text) {
    return {
        type: LOGIN_ERROR,
        text
    };
}

export function loginSuccess(id) {
    return {
        type: LOGIN_SUCCESS,
        id
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function register(username, password) {
    return {
        type: REGISTER,
        username,
        password
    };
}

export function registerError(text) {
    return {
        type: REGISTER_ERROR,
        text
    };
}

export function registerSuccess(id) {
    return {
        type: REGISTER_SUCCESS,
        id
    }
}

export function createTweet(id, text, tweetId) {
    return {
        type: CREATE_TWEET,
        id,
        text,
        tweetId
    }
}

export function createTweetError(text) {
    return {
        type: CREATE_TWEET_ERROR,
        text
    }
}

export function createTweetSuccess(tweet) {
    return {
        type: CREATE_TWEET_SUCCESS,
        tweet
    }
}

export function editTweet(id, text) {
    return {
        type: EDIT_TWEET,
        id,
        text
    }
}

export function editTweetSuccess(id, text) {
    return {
        type: EDIT_TWEET_SUCCESS,
        id,
        text
    }
}

export function editTweetError(id) {
    return {
        type: EDIT_TWEET_ERROR,
        id
    }
}

export function removeTweet(id) {
    return {
        type: REMOVE_TWEET,
        id
    }
}

export function removeTweetSuccess(id, text) {
    return {
        type: REMOVE_TWEET_SUCCESS,
        id,
        text
    }
}

export function removeTweetError(id) {
    return {
        type: REMOVE_TWEET_ERROR,
        id
    }
}

export function defaultStateTweet(id) {
    return {
        type: TWEET_DEFAULT_STATE,
        id
    }
}

