import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import AxiosApiInstance from '../AxiosApiInstance';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            api: new AxiosApiInstance(),
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

    componentWillMount() {
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
        this.state.api.axiosObject.get('/roles')
            .then(function (response) {
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
        this.state.api.axiosObject.post('/register', {
            name: this.state.registeredUser.name,
            email: this.state.registeredUser.email,
            password: this.state.registeredUser.password,
            password_confirmation: this.state.registeredUser.passwordConfirmation,
            role_id: this.state.registeredUser.roleId,
        })
            .then(
                function (response) {
                    this.props.history.push('/login')
                }.bind(this)
            )
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.setApiValidationErrors(error.response.data.errors);
                    }
                } else {
                    console.log('Error', error.message);
                }
            }.bind(this));
    }

    render() {
        return (
            <div className='register-form'>
                <Grid textAlign='center'>
                    <Grid.Column>
                        <Header as='h2' color='teal' textAlign='center'>
                            Registration
                        </Header>
                        <Form size='large' error>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Name'
                                    name='name'
                                    value={this.state.registeredUser.name}
                                    onChange={this.handleChange}
                                />
                                {this.state.registeredUser.nameError.length > 0 &&
                                <Message
                                    error
                                    content={this.state.registeredUser.nameError}
                                />
                                }
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Email'
                                    name='email'
                                    value={this.state.registeredUser.email}
                                    onChange={this.handleChange}
                                />
                                {this.state.registeredUser.emailError.length > 0 &&
                                <Message
                                    error
                                    content={this.state.registeredUser.emailError}
                                />}
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    value={this.state.registeredUser.password}
                                    onChange={this.handleChange}
                                />

                                {this.state.registeredUser.passwordError.length > 0 &&
                                <Message
                                    error
                                    content={this.state.registeredUser.passwordError}
                                />
                                }
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password confirmation'
                                    type='password'
                                    name='passwordConfirmation'
                                    value={this.state.registeredUser.passwordConfirmation}
                                    onChange={this.handleChange}
                                />
                                {this.state.registeredUser.passwordConfirmationError.length > 0 &&
                                <Message
                                    error
                                    content={this.state.registeredUser.passwordConfirmationError}
                                />
                                }
                                <Form.Select
                                    options={this.state.roles}
                                    placeholder='Role'
                                    name='roleId'
                                    value={this.state.registeredUser.roleId}
                                    onChange={this.handleChange}
                                />
                                {this.state.registeredUser.roleIdError.length > 0 &&
                                <Message
                                    error
                                    content={this.state.registeredUser.roleIdError}
                                />
                                }

                                <Button color='teal' onClick={this.handleSubmit} fluid
                                        size='large'>Registration</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Do you have account? <Link to='/login'>Sign in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}