import * as React from "react";

import {Card, CardActions, CardHeader} from '@mui/material';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useStore} from "./StoreContext";

const UsersContainer = () => {
    const {data: {users}} = useStore();
    const navigate = useNavigate();

    return <Users users={users} navigate={navigate} />;
}

const Users = ({users, navigate}) => {

    const usersCards = users.map((user) => <Card className={"users-card"} key={user.id}>
            <CardHeader title={`${user.username}, #${user.id}`}/>
            <CardActions>
                <Button onClick={() => navigate('/tweets/' + user.id)} variant='contained'>See the tweets</Button>
            </CardActions>
        </Card>
    );

    return (
        <div>
            {usersCards ? usersCards : "Sorry, no users. Try to register one"}
        </div>
    );
};

export default UsersContainer;
