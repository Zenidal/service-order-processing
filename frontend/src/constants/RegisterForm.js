import React from "react";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {LOGIN_PATH} from "./RoutePaths";
import {Link} from "react-router-dom";

const RegisterForm = (props) => (
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
                            value={props.registeredUser.name}
                            onChange={props.handleChange}
                        />
                        {props.registeredUser.nameError.length > 0 &&
                        <Message
                            error
                            content={props.registeredUser.nameError}
                        />
                        }
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Email'
                            name='email'
                            value={props.registeredUser.email}
                            onChange={props.handleChange}
                        />
                        {props.registeredUser.emailError.length > 0 &&
                        <Message
                            error
                            content={props.registeredUser.emailError}
                        />}
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={props.registeredUser.password}
                            onChange={props.handleChange}
                        />

                        {props.registeredUser.passwordError.length > 0 &&
                        <Message
                            error
                            content={props.registeredUser.passwordError}
                        />
                        }
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password confirmation'
                            type='password'
                            name='passwordConfirmation'
                            value={props.registeredUser.passwordConfirmation}
                            onChange={props.handleChange}
                        />
                        {props.registeredUser.passwordConfirmationError.length > 0 &&
                        <Message
                            error
                            content={props.registeredUser.passwordConfirmationError}
                        />
                        }
                        <Form.Select
                            options={props.roles}
                            placeholder='Role'
                            name='roleId'
                            value={props.registeredUser.roleId}
                            onChange={props.handleChange}
                        />
                        {props.registeredUser.roleIdError.length > 0 &&
                        <Message
                            error
                            content={props.registeredUser.roleIdError}
                        />
                        }

                        <Button color='teal' onClick={props.handleSubmit} fluid size='large'>
                            Registration
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Do you have account? <Link to={LOGIN_PATH}>Sign in</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
);

export default RegisterForm;