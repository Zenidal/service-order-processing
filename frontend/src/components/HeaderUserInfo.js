import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';

export default class HeaderUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            user: newProps.user
        });
    }

    render() {
        return this.state.user ?
            (
                <Menu.Menu position="right">
                    <Menu.Item as="div">{this.state.user.name} | {this.state.user.role.name}</Menu.Item>
                </Menu.Menu>
            ) :
            '';
    }
}