import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import {initApp} from './actions.js';
import {useStore} from "./StoreContext";

const AppContainer = props => {

    const {actions: {getUsers, logout}, data: {user, users}} = useStore();

    useEffect(() => {
        props.onInit();
        getUsers();
    }, []);

    return (
        <App user={user}
             users={users}
             children={props.children}
             logout={logout}
        />
    );

};

const App = props => {
    let topbarGreeting;

    const navigate = useNavigate();

    if (props.user.id < 0 || !props.users.length) {
        topbarGreeting = <Button onClick={() => navigate('/login')} primary="true">Login or register</Button>;
    } else {
        const username = props.users.find(user => +user.id === +props.user.id)?.username;

        topbarGreeting = username ? (
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
        ) : null;
    }

    return (
        <>
            {topbarGreeting}
            {props.children}
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    onInit: () => dispatch(initApp())
});

export default connect(null, mapDispatchToProps)(AppContainer);