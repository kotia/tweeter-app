import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as actionTypes from './actions.js'
import { tweeterMiddleware } from './middleware.js'

const usersReducer = function(state = [], action) {
    if (action.type === actionTypes.RECEIVE_USERS) {
        return action.users.map((user) => ({
            id: user.id,
            username: user.username
        }));
    } else if (action.type === actionTypes.ADD_USER) {
        return [...state, {id: action.id, username: action.username}];
    } else {
        return state;
    }
};

const userReducer = function(state = {
        id: -1,
        requestProcess: false,
        fail: false,
        errorText: ''
    }, action) {
    if (action.type === actionTypes.LOGIN) {
        return Object.assign({}, state, {requestProcess: true});
    } else if (action.type === actionTypes.LOGIN_ERROR) {
        return Object.assign({}, state, {requestProcess: false, fail: true, errorText: action.text})
    } else if (action.type === actionTypes.LOGIN_SUCCESS) {
        return Object.assign({}, state, {requestProcess: false, fail: false, id: action.id});
    } else if (action.type === actionTypes.REGISTER) {
        return Object.assign({}, state, {requestProcess: true});
    } else if (action.type === actionTypes.REGISTER_ERROR) {
        return Object.assign({}, state, {requestProcess: false, fail: true, errorText: action.text})
    } else if (action.type === actionTypes.REGISTER_SUCCESS) {
        return Object.assign({}, state, {requestProcess: false, fail: false, id: action.id});
    } else if (action.type === actionTypes.LOGOUT) {
        return Object.assign({}, state, {requestProcess: false, fail: false, id: -1});
    } else {
        return state;
    }
};

const tweetReducer = function(state = {
        requestProcess: false,
        fail: false,
        success: false,
        errorText: ""
    }, action) {
    if (action.type === actionTypes.CREATE_TWEET) {
        return Object.assign({}, state, {requestProcess: true, success: false});
    } else if (action.type === actionTypes.CREATE_TWEET_ERROR) {
        return Object.assign({}, state, {requestProcess: false, success: false, fail: true, errorText: action.text})
    } else if (action.type === actionTypes.CREATE_TWEET_SUCCESS) {
        return Object.assign({}, state, {requestProcess: false, success: true, fail: false});
    } else if (action.type === actionTypes.TWEET_DEFAULT_STATE) {
        return Object.assign({}, state, {requestProcess: false, success: false, fail: false});
    } else {
        return state;
    }
};

const addTweetStatusKeys = () => ({
    editing: false,
    deleting: false,
    error: false,
    success: false,
    edit_success: false,
    errorText: ""
});

const tweetsReducer = function(state = [], action) {

    let tweet;
    let newState = state.map((ftweet) => Object.assign({}, ftweet));

    if (action.id) {
        tweet = newState.find((ftweet) => ftweet.id === action.id);
    }

    if (action.type === actionTypes.RECEIVE_TWEETS) {
        return action.tweets.map((ftweet) => Object.assign(ftweet, addTweetStatusKeys()));
    } else if (action.type === actionTypes.CREATE_TWEET_SUCCESS) {
        return [...newState, Object.assign({}, action.tweet, addTweetStatusKeys(), {success: true})];
    } else if (action.type === actionTypes.EDIT_TWEET) {
        Object.assign(tweet, {editing: true, error: false, success: false, edit_success: false, text: action.text});
        return newState;
    } else if (action.type === actionTypes.EDIT_TWEET_SUCCESS) {
        Object.assign(tweet, {editing: false, error: false, success: false, edit_success: true, text: action.text});
        return newState;
    } else if (action.type === actionTypes.REMOVE_TWEET) {
        Object.assign(tweet, {editing: false, error: false, deleting: true});
        return newState;
    } else if (action.type === actionTypes.REMOVE_TWEET_SUCCESS) {
        newState = newState.filter((ftweet) => ftweet.id !== action.id);
        return newState;
    } else if (action.type === actionTypes.TWEET_DEFAULT_STATE && tweet) {
        Object.assign(tweet, {success: false, edit_success: false});
        return newState;
    } else {
        return state;
    }
};

const reducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    tweet: tweetReducer,
    tweets: tweetsReducer
});

export const store = applyMiddleware(tweeterMiddleware)(createStore)(reducers);
