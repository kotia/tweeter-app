import React, { useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { connect } from "react-redux";
import {logout, initApp} from './actions.js';

const AppContainer = props => {
    console.log(props);

    useEffect(() => {
        props.onInit();
    }, []);

    return (
        <App user={props.user}
             users={props.users}
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
            <div>
                <Toolbar>
                    <div>
                        {topbarGreeting}
                    </div>
                </Toolbar>
                {props.children}
            </div>
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