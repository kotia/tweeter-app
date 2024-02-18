import {Button, TextField} from '@mui/material';
import {ChangeEvent, FC, memo, useCallback, useEffect, useState} from "react";
import styles from './Login.module.scss';
import {useUser} from "../../hooks/useUser.ts";
import {useUserQuery} from "../../hooks/useUserQuery.ts";
import {useUsersStore} from "../../hooks/useUsersStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useNavigate} from "react-router-dom";

const LoginContainer: FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const {login, register} = useUserQuery();
    const {error, errorText} = useUsersStore(useShallow(({error, errorText}) => ({error, errorText})));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleLogin = useCallback(() => {
        login({username, password});
    }, [login, password, username]);

    const handleRegister = useCallback(() => {
        register({username, password});
    }, [password, register, username]);
    
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);
    
    const canLogin = !!username && !!password;

    return <>
        {!user &&
            <div className={styles.formContainer}>
                <h2>Sign in or Sign up</h2>
                <TextField label='Username' name='username' variant='outlined' onChange={onUsernameChange} value={username} />
                <TextField label='Password' name='password' type='password' variant='outlined' value={password} onChange={onPasswordChange} />
                {error && <div className={styles.error}>{errorText}</div>}
                <div className={styles.buttonsContainer}>
                    <Button disabled={!canLogin} onClick={handleLogin} variant='outlined'>Sign in</Button>
                    <Button disabled={!canLogin} onClick={handleRegister} variant='outlined'>Sign up</Button>
                </div>
            </div>
        }
    </>;
}

export const Login = memo(LoginContainer);