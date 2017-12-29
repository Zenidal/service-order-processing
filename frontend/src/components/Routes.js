import React, {Component} from 'react';
import {Switch} from 'react-router';
import Home from '../pages/Home';
import Orders from '../pages/order/Orders';
import ShowOrder from '../pages/order/Show';
import ProcessOrder from '../pages/order/Process';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserService from "../services/UserService";
import {
    HOME_PATH, REGISTER_PATH, LOGIN_PATH, ORDER_PATH, ORDER_EDIT_PATH,
    ORDER_NEW_PATH, ORDER_STATUS_MANAGEMENT_PATH, ORDER_SHOW_PATH
} from '../constants/RoutePaths';
import {GuestRoute, PrivateRoute} from '../constants/RouteAccess';
import StatusManagementOrder from "../pages/order/StatusManagement";

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    render() {
        return (
            <Switch>
                <PrivateRoute path={HOME_PATH} component={Home}/>

                <PrivateRoute exact path={ORDER_PATH} component={Orders}/>
                <PrivateRoute exact path={ORDER_SHOW_PATH} component={ShowOrder}/>
                <PrivateRoute exact path={ORDER_STATUS_MANAGEMENT_PATH} component={StatusManagementOrder}/>
                <PrivateRoute exact path={ORDER_NEW_PATH} component={ProcessOrder}/>
                <PrivateRoute path={ORDER_EDIT_PATH} component={ProcessOrder}/>

                <GuestRoute path={REGISTER_PATH} component={Register}/>
                <GuestRoute path={LOGIN_PATH} component={Login}/>
            </Switch>
        );
    }
}