import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';

import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {login, register} from "./actions.js";

const LoginContainer = props => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [previousUserId, setPreviousUserId] = useState(props.user.id);

    useEffect(() => {
        setPreviousUserId(props.user.id);
        if (+previousUserId < 0 && +props.user.id >= 0) {
            navigate('/');
        }
    }, [props.user]);

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

    return (
        <Card className="login-form">
            <CardHeader title="Please, Log in or Register" />
            <TextFields>
                <TextField
                    label="Username"
                    onChange={props.onChangeUsername}
                    className="login-field"/>
                <br />
                <TextField
                    label="Password"
                    type="password"
                    onChange={props.onChangePassword}
                    className="password-field"/>
                {props.user.fail && <p className="error-text">{props.user.errorText}</p>}
            </TextFields>
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

const TextFields = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
