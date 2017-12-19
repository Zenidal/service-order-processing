import React, {Component} from 'react';
import {Switch} from 'react-router';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserService from "../services/UserService";
import {HOME_PATH, REGISTER_PATH, LOGIN_PATH} from '../constants/RoutePaths';
import {GuestRoute, PrivateRoute} from '../constants/RouteAccess';

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    render() {
        return (
            <Switch>
                <PrivateRoute path={HOME_PATH} component={Home}/>

                <GuestRoute path={REGISTER_PATH} component={Register}/>

                <GuestRoute path={LOGIN_PATH} component={Login}/>
            </Switch>
        );
    }
}