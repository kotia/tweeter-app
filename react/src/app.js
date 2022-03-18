import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import {initApp, logout} from './actions.js';
import {useStore} from "./StoreContext";

const AppContainer = props => {

    const store = useStore();

    useEffect(() => {
        props.onInit();
        store.actions.getUsers();
    }, []);

    return (
        <App user={props.user}
             users={store.data.users}
             children={props.children}
             logout={props.onLogout}
        />
    );

};

const App = props => {
    let username, topbarGreeting;

    const navigate = useNavigate();

    if (props.user.id < 0 || !props.users.length) {
        topbarGreeting = <Button onClick={() => navigate('/login')} primary="true">Login or register</Button>;
    } else {
        username = props.users.find(user => user.id === props.user.id).username;
        topbarGreeting = (
            <div>
                <div
                    className="username-greeting"
                >{`welcome ${username} #${props.user.id}`}</div>

                <Button
                    onClick={() => navigate('/')}
                    className="users-list-button"
                    variant='contained'
                >Go to users list</Button>

                <Button
                    onClick={() => navigate('/create')}
                    className="margined-button create-tweet-button"
                    variant='outlined'
                >Create tweet</Button>
                <Button
                    variant='outlined'
                    className="logout-button"
                    onClick={() => {
                        props.logout();
                        navigate('/');
                    }}
                >Logout</Button>
            </div>
        )
    }

    return (
        <>
            {topbarGreeting}
            {props.children}
        </>
    );
};

const mapStateToProps = store => ({
    user: store.user,
    users: store.users
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
    onInit: () => dispatch(initApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);