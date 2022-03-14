import React, {useState} from "react";
import {login, register} from "./actions.js";

import {connect} from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginContainer = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        if (username && password) {
            props.onLogin(username, password);
        }

    };

    const register = () => {
        if (username && password) {
            props.onRegister(username, password);
        }
    };

    const onChangeUsername = e => setUsername(e.target.value);

    const onChangePassword = e => setPassword(e.target.value);


    return (
        <div>
            <Login
                user={props.user}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                login={login}
                register={register}
                username={username}
                password={password}/>
        </div>
    );

};

const Login = props => {
    const errorBlock = <p className="error-text">{props.user.errorText}</p>;
    return (
        <Card className="login-form">
            <CardHeader>Please, Log in or Register</CardHeader>
            <CardContent>
                <TextField
                    onChange={props.onChangeUsername}
                    className="login-field"
                    floatingLabelText="Username"/>
                <br />
                <TextField
                    onChange={props.onChangePassword}
                    className="password-field"
                    floatingLabelText="Password"/>
                {props.user.fail && errorBlock}
            </CardContent>
            <CardActions>
                <Button
                    className="login-button"
                    disabled={props.user.requestProcess}
                    onClick={props.login} label="Log In">Log In</Button>
                <Button
                    className="password-button"
                    disabled={props.user.requestProcess}
                    onClick={props.register} label="Register">Register</Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = store => ({
    user: store.user
});

const mapDispatchToProps = dispatch => ({
    onRegister(username, password) {
        dispatch(register(username, password));
    },
    onLogin(username, password) {
        dispatch(login(username, password));
    }
});

export const LoginContainerCon = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
