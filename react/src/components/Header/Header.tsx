import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {FC, memo, useCallback, useEffect} from "react";
import styles from './Header.module.scss';
import {useUser} from "../../hooks/useUser.ts";
import {useUserQuery} from "../../hooks/useUserQuery.ts";

const HeaderContainer: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useUser();
    const {logout} = useUserQuery();

    const navLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/tweets');
        }
    }, [location.pathname, navigate]);

    return <>
        {!user &&
            <div className={styles.buttonsContainer}>
                <Button variant='outlined' size='small' onClick={navLogin}>Log in or Sign Up</Button>
            </div>
        }
        {user &&
            <div className={styles.buttonsContainer}>
                <div>Welcome {user.name} #{user.id}</div>
                <Button variant='outlined' size='small' onClick={handleLogout}>Log out</Button>
            </div>
        }
        <Outlet />
        </>;
}

export const Header = memo(HeaderContainer);