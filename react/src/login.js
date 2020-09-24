import * as React from "react";
import {login, register} from "./actions.js";

import {connect} from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginContainer extends React.Component {
    constructor(props){
        super(props);

        this.actions = {
            login: this.login.bind(this),
            register: this.register.bind(this),
            onChangeUsername: this.onChangeUsername.bind(this),
            onChangePassword: this.onChangePassword.bind(this)
        };

        this.state = {
            username: "",
            password: ""
        }
    }

    login(){
        this.props.onLogin(this.state.username, this.state.password);
    }

    register(){
        this.props.onRegister(this.state.username, this.state.password);
    }

    onChangeUsername(e){
        this.setState({username: e.target.value});
    }

    onChangePassword(e){
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
                <Login
                    user={this.props.user}
                    actions={this.actions}
                    username={this.state.username}
                    password={this.state.password} />
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let errorBlock = "";
        if (this.props.user.fail) {
            errorBlock = <p className="error-text">{this.props.user.errorText}</p>
        }
        return (
            <Card className = "login-form">
                <CardHeader>Please, Log in or Register</CardHeader>
                <CardContent>
                    <TextField
                        onChange={this.props.actions.onChangeUsername}
                        className="login-field"
                        floatingLabelText="Username"/>
                    <br />
                    <TextField
                        onChange={this.props.actions.onChangePassword}
                        className="password-field"
                        floatingLabelText="Password"/>
                    {errorBlock}
                </CardContent>
                <CardActions>
                    <Button
                        className="login-button"
                        disabled={this.props.user.requestProcess}
                        onClick={this.props.actions.login} label="Log In" >Log In</Button>
                    <Button
                        className="password-button"
                        disabled={this.props.user.requestProcess}
                        onClick={this.props.actions.register} label="Register" >Register</Button>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (store) => ({
    user: store.user
});

const mapDispatchToProps = (dispatch) => ({
    onRegister(username, password) {
        dispatch(register(username, password));
    },
    onLogin(username, password) {
        dispatch(login(username, password));
    }
});

export const LoginContainerCon = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
