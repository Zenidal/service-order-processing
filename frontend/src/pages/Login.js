import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large'>Login</Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='/register'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}