import React, {Component} from 'react';
import {Header, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {HOME_PATH, REGISTER_PATH, LOGIN_PATH, ORDER_PATH, COMPANY_PATH} from '../constants/RoutePaths';
import {withRouter} from 'react-router';
import HeaderUserInfo from "./HeaderUserInfo";
import NotificationSystem from "react-notification-system";
import ServiceContainer from "./ServiceContainer";
import * as UserHelper from "../constants/UserHelper";

class CustomHeader extends Component {
    constructor(props) {
        super(props);

        this.serviceContainer = null;
        this.notificationSystem = null;

        this.state = {};

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
        this.serviceContainer = this.refs.serviceContainer;
    }

    logout(event) {
        this.serviceContainer.userService.logout(
            function (response) {
                this.props.history.push(LOGIN_PATH);
            }.bind(this),
            function (error) {
                this.props.history.push(LOGIN_PATH);
                this.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
            }.bind(this)
        );
    }

    render() {
        let homeLink = UserHelper.isAuthenticated() ?
            <Menu.Item as={Link} to={HOME_PATH}>Home</Menu.Item> :
            '';
        let orderLink = UserHelper.isAuthenticated() ?
            <Menu.Item as={Link} to={ORDER_PATH}>Orders</Menu.Item> :
            '';
        let managerLink = UserHelper.isManager() ?
            <Menu.Item as={Link} to={COMPANY_PATH}>Companies</Menu.Item> :
            '';
        let loginLink = !UserHelper.isAuthenticated() ?
            <Menu.Item as={Link} to={LOGIN_PATH}>Sign in</Menu.Item> :
            '';
        let registerLink = !UserHelper.isAuthenticated() ?
            <Menu.Item as={Link} to={REGISTER_PATH}>Sign up</Menu.Item> :
            '';
        let logoutLink = UserHelper.isAuthenticated() ?
            <Menu.Item onClick={this.logout}>Log out</Menu.Item> :
            '';

        return (
            <Header block>
                <Menu>
                    {homeLink}
                    {orderLink}
                    {managerLink}
                    {loginLink}
                    {registerLink}
                    {logoutLink}
                    <HeaderUserInfo user={UserHelper.user()}/>
                    <NotificationSystem ref="notificationSystem"/>
                    <ServiceContainer ref="serviceContainer"/>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(CustomHeader);