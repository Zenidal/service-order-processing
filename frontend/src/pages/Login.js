import React, {Component} from 'react';
import {HOME_PATH} from "../constants/RoutePaths";
import NotificationSystem from "react-notification-system";
import LoginForm from "../constants/LoginForm";
import ServiceContainer from "../components/ServiceContainer";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.serviceContainer = null;
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

    componentDidMount() {
        this.serviceContainer = this.refs.serviceContainer;
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
        this.serviceContainer.userService.login(
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
            <div>
                <LoginForm
                    loginUser={this.state.loginUser}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <NotificationSystem ref="notificationSystem"/>
                <ServiceContainer ref="serviceContainer"/>
            </div>
        );
    }
}