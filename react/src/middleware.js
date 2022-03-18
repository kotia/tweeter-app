import * as actions from './actions.js';

const saveLogin = (id) => {
    window.localStorage.setItem('userId', id);
};

const removeLogin = () => {
    window.localStorage.removeItem('userId');
};

export function tweeterMiddleware(store) {
    return next => action => {
        const result = next(action);

        if (action.type === actions.INIT_APP) {
            fetch('/api/getTweets', {method: 'GET'})
                .then((resp) => resp.json())
                .then((resp) => {
                    store.dispatch(actions.receiveTweets(resp));
                    const savedUserId = window.localStorage.getItem('userId');

                    if (savedUserId) {
                        store.dispatch(actions.loginSuccess(savedUserId));
                    }
                });
        } else if (action.type === actions.LOGIN) {
            fetch('/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: action.username,
                    password: action.password
                })
            }).then((resp) => resp.json()).then((resp) => {
                if (resp.result === 'error') {
                    store.dispatch(actions.loginError(resp.desc));
                } else {
                    store.dispatch(actions.loginSuccess(resp.id));
                    saveLogin(resp.id);
                }
            });
        } else if (action.type === actions.REGISTER) {
            fetch('/api/register', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: action.username,
                    password: action.password
                })
            }).then((resp) => resp.json()).then((resp) => {
                if (resp.result === 'error') {
                    store.dispatch(actions.registerError(resp.desc));
                } else {
                    store.dispatch(actions.addUser({id: resp.id, username: action.username}));
                    store.dispatch(actions.registerSuccess(resp.id));
                    saveLogin(resp.id);
                }
            });
        } else if (action.type === actions.LOGOUT) {
            removeLogin();
        } else if (action.type === actions.CREATE_TWEET) {
            fetch('/api/addTweet', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: action.id,
                    text: action.text,
                    tweetId: action.tweetId
                })
            }).then((resp) => resp.json()).then((resp) => {
                store.dispatch(actions.createTweetSuccess(resp));
            });
        } else if (action.type === actions.REMOVE_TWEET) {
            fetch('/api/removeTweet', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: action.id
                })
            }).then(() => {
                store.dispatch(actions.removeTweetSuccess(action.id));
            });

        } else if (action.type === actions.EDIT_TWEET) {
            fetch('/api/editTweet', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: action.id,
                    text: action.text
                })
            }).then((resp) => resp.json()).then((resp) => {
                store.dispatch(actions.editTweetSuccess(resp.id, resp.text));
            })
        }

        return result;
    }
}