import {createBrowserRouter} from "react-router-dom";
import {Header} from "./Header/Header.tsx";
import {Login} from "./Login/Login.tsx";
import {Tweets} from "./Tweets/Tweets.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        children: [
            {
                path: 'tweets',
                element: <Tweets />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
]);