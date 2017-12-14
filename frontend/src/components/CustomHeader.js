import React, {Component} from 'react';
import {Header, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class CustomHeader extends Component {
    render() {
        return (
            <Header block>
                <Menu>
                    <Menu.Item as={Link} to='/home'>Home</Menu.Item>
                    <Menu.Item as={Link} to='/login'>Sign in</Menu.Item>
                    <Menu.Item as={Link} to='/register'>Sign up</Menu.Item>
                </Menu>
            </Header>
        );
    }
}