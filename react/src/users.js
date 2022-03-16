import * as React from "react";
import {connect} from "react-redux";

import {Card, CardActions, CardHeader} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UsersContainer = ({users}) => <Users users={users} />;

const Users = (props) => {
    const navigate = useNavigate();


        const usersCards = props.users.map((user) => <Card className={"users-card"} key={user.id}>
                <CardHeader title={`${user.username}, #${user.id}`} />
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

const mapStateToProps = (store) => ({
    users: store.users
});

export default connect(mapStateToProps)(UsersContainer);
