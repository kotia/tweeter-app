import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useStore} from "./hooks/StoreContext";

export const LoginContainer = () => {

    const navigate = useNavigate();
    const {data: {user}, actions: {login, register}} = useStore();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [previousUserId, setPreviousUserId] = useState(user.id);

    useEffect(() => {
        setPreviousUserId(user.id);

        if (+previousUserId !== +user.id && +user.id >= 0) {
            navigate('/');
        }
    }, [user]);

    const onLogin = () => {
        if (username && password) {
            login(username, password);
        }
    };

    const onRegister = () => {
        if (username && password) {
            register(username, password);
        }
    };

    const onChangeUsername = e => setUsername(e.target.value);

    const onChangePassword = e => setPassword(e.target.value);


    return (
        <div>
            <Login
                user={user}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                login={onLogin}
                register={onRegister}
                username={username}
                password={password}/>
        </div>
    );

};

const Login = props => {

    return (
        <Card className="login-form">
            <CardHeader title="Please, Log in or Register"/>
            <TextFields>
                <TextField
                    label="Username"
                    onChange={props.onChangeUsername}
                    className="login-field"/>
                <br/>
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
