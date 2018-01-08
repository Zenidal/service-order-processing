import React from 'react';
import {Grid, Header, Segment, Message, Form, Button} from 'semantic-ui-react';

const CompanyForm = (props) => (
    <Grid textAlign='center'>
        <Grid.Column>
            <Header as='h2' color='teal' textAlign='center'>
                Company {props.actionText}
            </Header>
            <Form size='large' error>
                <Segment stacked>
                    {props.error.length > 0 &&
                    <Message
                        error
                        content={props.error}
                    />
                    }
                    <Form.Input
                        fluid
                        placeholder='Name'
                        name='name'
                        value={props.company.name}
                        onChange={props.handleChange}
                    />

                    <Button color='teal' onClick={props.handleSubmit} fluid
                            size='large'>{props.actionText}</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
);

export default CompanyForm;