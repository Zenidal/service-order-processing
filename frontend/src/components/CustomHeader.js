import React, {Component} from 'react';
import {Header, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import {HOME_PATH, REGISTER_PATH, LOGIN_PATH} from '../constants/RoutePaths';
import {withRouter} from 'react-router';
import HeaderUserInfo from "./HeaderUserInfo";

class CustomHeader extends Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.state = {};

        this.logout = this.logout.bind(this);
    }

    logout(event) {
        this.userService.logout(
            function (response) {
                this.props.history.push(LOGIN_PATH);
            }.bind(this),
            function (error) {
                this.props.history.push(LOGIN_PATH);
                console.log('Error: ', error.message);
            }.bind(this)
        );
    }

    render() {
        let homeLink = UserService.isAuthenticated() ?
            <Menu.Item as={Link} to={HOME_PATH}>Home</Menu.Item> :
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
                    {loginLink}
                    {registerLink}
                    {logoutLink}
                    <HeaderUserInfo user={UserService.user()}/>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(CustomHeader);