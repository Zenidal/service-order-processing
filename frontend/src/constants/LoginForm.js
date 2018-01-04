import React from "react";
import {REGISTER_PATH} from "./RoutePaths";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const LoginForm = (props) => (
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
                        value={props.loginUser.email}
                        onChange={props.handleChange}
                    />
                    {props.loginUser.emailError.length > 0 &&
                    <Message
                        error
                        content={props.loginUser.emailError}
                    />
                    }
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={props.loginUser.password}
                        onChange={props.handleChange}
                    />
                    {props.loginUser.passwordError.length > 0 &&
                    <Message
                        error
                        content={props.loginUser.passwordError}
                    />
                    }

                    <Button color='teal' onClick={props.handleSubmit} fluid size='large'>Login</Button>
                </Segment>
            </Form>
            <Message>
                New to us? <Link to={REGISTER_PATH}>Sign Up</Link>
            </Message>
        </Grid.Column>
    </Grid>
);

export default LoginForm;