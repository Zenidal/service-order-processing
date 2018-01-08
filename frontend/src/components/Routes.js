import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import Home from '../pages/Home';
import Orders from '../pages/order/Orders';
import ShowOrder from '../pages/order/Show';
import ProcessOrder from '../pages/order/Process';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserService from "../services/UserService";
import {
    HOME_PATH, REGISTER_PATH, LOGIN_PATH, ORDER_PATH, ORDER_EDIT_PATH,
    ORDER_NEW_PATH, ORDER_STATUS_MANAGEMENT_PATH, ORDER_SHOW_PATH, COMPANY_ALL_PATH, COMPANY_NEW_PATH,
    COMPANY_EDIT_PATH
} from '../constants/RoutePaths';
import {GuestRoute, PrivateRoute, ManagerRoute} from '../constants/RouteAccess';
import StatusManagementOrder from "../pages/order/StatusManagement";
import Companies from "../pages/company/Companies";
import ProcessCompany from "../pages/company/Process";

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    render() {
        return (
            <Switch>
                <Route exact path={HOME_PATH} component={UserService.isAuthenticated() ? Home : Login}/>

                <PrivateRoute exact path={ORDER_PATH} component={Orders}/>
                <PrivateRoute exact path={ORDER_SHOW_PATH} component={ShowOrder}/>
                <PrivateRoute exact path={ORDER_STATUS_MANAGEMENT_PATH} component={StatusManagementOrder}/>
                <PrivateRoute exact path={ORDER_NEW_PATH} component={ProcessOrder}/>
                <PrivateRoute path={ORDER_EDIT_PATH} component={ProcessOrder}/>

                <ManagerRoute exact path={COMPANY_NEW_PATH} component={ProcessCompany}/>
                <ManagerRoute exact path={COMPANY_EDIT_PATH} component={ProcessCompany}/>
                <ManagerRoute path={COMPANY_ALL_PATH} component={Companies}/>

                <GuestRoute path={REGISTER_PATH} component={Register}/>
                <GuestRoute path={LOGIN_PATH} component={Login}/>
            </Switch>
        );
    }
}