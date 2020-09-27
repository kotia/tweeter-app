import React, { useEffect } from "react";


import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {logout, initApp} from './actions.js';

const AppContainer = props => {
    useEffect(() => {
        this.props.onInit();
    });


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

        if (props.user.id < 0 || !props.users.length) {
            topbarGreeting = <Link to="/login"><Button primary>Login or register</Button></Link>;
        } else {
            username = props.users.find(user => user.id === props.user.id).username;
            topbarGreeting = (
                <div>
                    <div
                        className="username-greeting"
                    >{`welcome ${username} #${props.user.id}`}</div>
                    <Link to="/">
                        <Button
                            className="users-list-button"
                            primary
                            >Go to users list</Button>
                    </Link>
                    <Link to="/create">
                        <Button
                            className="margined-button create-tweet-button"
                            secondary
                        >Create tweet</Button>
                    </Link>
                    <Link to="/">
                        <Button
                            secondary
                            className="logout-button"
                            onClick={props.logout}
                            >Logout</Button>
                    </Link>
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
                {this.props.children}
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