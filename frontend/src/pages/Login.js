import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';
import {HOME_PATH, REGISTER_PATH} from "../constants/RoutePaths";
import NotificationSystem from "react-notification-system";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.notificationSystem = null;

        this.state = {
            loginUser: {
                email: '',
                password: '',

                emailError: '',
                passwordError: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.notificationSystem = this.refs.notificationSystem;
    }

    handleChange(event, {name, value}) {
        this.setState((prevState, props) => {
            let loginUser = prevState.loginUser;
            loginUser[name] = value;
            return {loginUser: loginUser}
        });
    }

    handleSubmit() {
        this.login();
    }

    setApiValidationErrors(errors) {
        this.resetErrors();

        let errorFields = [];
        if (errors.email) errorFields.push({apiField: 'email'});
        if (errors.password) errorFields.push({apiField: 'password'});
        this.setState((prevState, props) => {
            let loginUser = prevState.loginUser;
            for (let i = 0; i < errorFields.length; i++) {
                let error = '';
                for (let index = 0; index < errors[errorFields[i].apiField].length; index++) {
                    error += errors[errorFields[i].apiField][index];
                    error += (index + 1) < errors[errorFields[i].apiField].length ? ' | ' : '';
                }
                loginUser[(errorFields[i].frontField ? errorFields[i].frontField : errorFields[i].apiField) + 'Error'] = error;
            }
            return {loginUser: loginUser};
        });
    }


    resetErrors() {
        this.setState((prevState, props) => {
            let loginUser = prevState.loginUser;
            loginUser.emailError = '';
            loginUser.passwordError = '';
        });
    }

    login() {
        this.userService.login(
            this.state.loginUser,
            function (response) {
                this.props.history.push(HOME_PATH);
            }.bind(this),
            function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.setApiValidationErrors(error.response.data.errors);
                    }
                } else {
                    this.notificationSystem.addNotification({
                        message: error.message,
                        level: 'error'
                    });
                }
            }.bind(this)
        );
    }

    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large' error>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                name='email'
                                value={this.state.loginUser.email}
                                onChange={this.handleChange}
                            />
                            {this.state.loginUser.emailError.length > 0 &&
                            <Message
                                error
                                content={this.state.loginUser.emailError}
                            />
                            }
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                value={this.state.loginUser.password}
                                onChange={this.handleChange}
                            />
                            {this.state.loginUser.passwordError.length > 0 &&
                            <Message
                                error
                                content={this.state.loginUser.passwordError}
                            />
                            }

                            <Button color='teal' onClick={this.handleSubmit} fluid size='large'>Login</Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to={REGISTER_PATH}>Sign Up</Link>
                    </Message>
                    <NotificationSystem ref="notificationSystem"/>
                </Grid.Column>
            </Grid>
        );
    }
}