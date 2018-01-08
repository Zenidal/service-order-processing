import React, {Component} from 'react';
import {Header, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import {HOME_PATH, REGISTER_PATH, LOGIN_PATH, ORDER_PATH, COMPANY_PATH} from '../constants/RoutePaths';
import {withRouter} from 'react-router';
import HeaderUserInfo from "./HeaderUserInfo";
import NotificationSystem from "react-notification-system";

class CustomHeader extends Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.notificationSystem = null;

        this.state = {};

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    logout(event) {
        this.userService.logout(
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
        let homeLink = UserService.isAuthenticated() ?
            <Menu.Item as={Link} to={HOME_PATH}>Home</Menu.Item> :
            '';
        let orderLink = UserService.isAuthenticated() ?
            <Menu.Item as={Link} to={ORDER_PATH}>Orders</Menu.Item> :
            '';
        let managerLink = UserService.isManager() ?
            <Menu.Item as={Link} to={COMPANY_PATH}>Companies</Menu.Item> :
            '';
        let loginLink = !UserService.isAuthenticated() ?
            <Menu.Item as={Link} to={LOGIN_PATH}>Sign in</Menu.Item> :
            '';
        let registerLink = !UserService.isAuthenticated() ?
            <Menu.Item as={Link} to={REGISTER_PATH}>Sign up</Menu.Item> :
            '';
        let logoutLink = UserService.isAuthenticated() ?
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
                    <HeaderUserInfo user={UserService.user()}/>
                    <NotificationSystem ref="notificationSystem"/>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(CustomHeader);