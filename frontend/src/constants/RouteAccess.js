import React from 'react';
import {Route, Redirect} from 'react-router';
import UserService from "../services/UserService";
import {HOME_PATH, LOGIN_PATH} from "./RoutePaths";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        UserService.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: LOGIN_PATH,
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const GuestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !UserService.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: HOME_PATH,
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const ManagerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        UserService.isManager() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: HOME_PATH,
                state: { from: props.location }
            }}/>
        )
    )}/>
);

export {PrivateRoute, GuestRoute, ManagerRoute};