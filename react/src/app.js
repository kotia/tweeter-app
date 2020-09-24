import React, { Component } from "react";


import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {logout, initApp} from './actions.js';

class AppContainer extends Component {
    componentDidMount() {
        this.props.onInit();
    }

    render() {
        return (
            <App user={this.props.user}
                 users={this.props.users}
                 children={this.props.children}
                 logout={this.props.onLogout}
            />
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let username, topbarGreeting;

        if (this.props.user.id < 0 || !this.props.users.length) {
            topbarGreeting = <Link to="/login"><Button primary={true}>Login or register</Button></Link>;
        } else {
            username = this.props.users.find((user) => user.id === this.props.user.id).username;
            topbarGreeting = (
                <div>
                    <div
                        className="username-greeting"
                    >{'welcome ' + username + ' #' + this.props.user.id}</div>
                    <Link to="/">
                        <Button
                            className="users-list-button"
                            primary={true}
                            >Go to users list</Button>
                    </Link>
                    <Link to="/create">
                        <Button
                            className="margined-button create-tweet-button"
                            secondary={true}
                        >Create tweet</Button>
                    </Link>
                    <Link to="/">
                        <Button
                            secondary={true}
                            className="logout-button"
                            onClick={this.props.logout}
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
    }
}

let mapStateToProps = (store) => ({
    user: store.user,
    users: store.users
});

let mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(logout()),
    onInit: () => dispatch(initApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);