import * as React from "react";
import {connect} from "react-redux";

import {Card, CardActions, CardHeader} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class UsersContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Users users={this.props.users} />
        );
    }
}

class Users extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let usersCards = this.props.users.map((user) =>
            <Card className={"users-card"} key={user.id}>
                <CardHeader>{user.username}, {"#" + user.id}</CardHeader>
                <CardActions>
                    <Link to={'/tweets/' + user.id}>
                        <Button primary>See the tweets</Button>
                    </Link>
                </CardActions>
            </Card>
        );

        return (
            <div>
                {usersCards ? usersCards : "Sorry, no users. Try to register one"}
            </div>
        );
    }
}



let mapStateToProps = (store) => ({
    users: store.users
});

export const UsersContainerCon = connect(mapStateToProps)(UsersContainer);
