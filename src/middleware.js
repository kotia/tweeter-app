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
            Promise.all([
                fetch('/getUsers', {method: 'GET'}),
                fetch('/getTweets', {method: 'GET'})
            ]).then((resp) => Promise.all([resp[0].json(), resp[1].json()])
            ).then((resp) => {
                store.dispatch(actions.receiveUsers(resp[0]));
                store.dispatch(actions.receiveTweets(resp[1]));

                const savedUserId = window.localStorage.getItem('userId');

                if (savedUserId) {
                    store.dispatch(actions.loginSuccess(savedUserId));
                }
            });
        } else if (action.type === actions.LOGIN) {
            fetch('/login', {
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
            fetch('/register', {
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
            fetch('/addTweet', {
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
            fetch('/removeTweet', {
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
            fetch('/editTweet', {
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