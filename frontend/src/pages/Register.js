import React, {Component} from 'react';
import AxiosApiInstance from '../services/AxiosApiInstance';
import {LOGIN_PATH} from "../constants/RoutePaths";
import NotificationSystem from "react-notification-system";
import RegisterForm from "../constants/RegisterForm";
import ServiceContainer from "../components/ServiceContainer";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.api = new AxiosApiInstance();
        this.notificationSystem = null;
        this.serviceContainer = null;

        this.state = {
            roles: [],
            registeredUser: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                roleId: '',

                nameError: '',
                emailError: '',
                passwordError: '',
                passwordConfirmationError: '',
                roleIdError: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
        this.serviceContainer = this.refs.serviceContainer;

        this.initializeRoles();
    }

    handleChange(event, {name, value}) {
        this.setState((prevState, props) => {
            let registeredUser = prevState.registeredUser;
            registeredUser[name] = value;
            return {registeredUser: registeredUser}
        });
    }

    handleSubmit() {
        this.register();
    }

    initializeRoles() {
        this.serviceContainer.roleService.getAllRoles(function (response) {
            this.setState({
                roles: response.data.roles.map(function (role, index) {
                    return {
                        key: role.id,
                        value: role.id,
                        text: role.name
                    };
                })
            });
        }.bind(this));
    }

    setApiValidationErrors(errors) {
        this.resetErrors();

        let errorFields = [];
        if (errors.name) errorFields.push({apiField: 'name'});
        if (errors.email) errorFields.push({apiField: 'email'});
        if (errors.password) errorFields.push({apiField: 'password'});
        if (errors.role_id) errorFields.push({apiField: 'role_id', frontField: 'roleId'});
        this.setState((prevState, props) => {
            let registeredUser = prevState.registeredUser;
            for (let i = 0; i < errorFields.length; i++) {
                let error = '';
                for (let index = 0; index < errors[errorFields[i].apiField].length; index++) {
                    error += errors[errorFields[i].apiField][index];
                    error += (index + 1) < errors[errorFields[i].apiField].length ? ' | ' : '';
                }
                registeredUser[(errorFields[i].frontField ? errorFields[i].frontField : errorFields[i].apiField) + 'Error'] = error;
            }
            return {registeredUser: registeredUser};
        });
    }

    resetErrors() {
        this.setState((prevState, props) => {
            let registeredUser = prevState.registeredUser;
            registeredUser.nameError = '';
            registeredUser.emailError = '';
            registeredUser.passwordError = '';
            registeredUser.roleIdError = '';
        });
    }

    register() {
        this.serviceContainer.userService.register(
            this.state.registeredUser,
            function (response) {
                this.props.history.push(LOGIN_PATH)
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
                <RegisterForm
                    registeredUser={this.state.registeredUser}
                    roles={this.state.roles}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <NotificationSystem ref="notificationSystem"/>
                <ServiceContainer ref="serviceContainer"/>
            </div>
        )
    }
}