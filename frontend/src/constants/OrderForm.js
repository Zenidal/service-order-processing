import React from 'react';
import {Grid, Header, Segment, Message, Form, Button, Dropdown} from 'semantic-ui-react';

const OrderForm = (props) => (
    <Grid textAlign='center'>
        <Grid.Column>
            <Header as='h2' color='teal' textAlign='center'>
                Order {props.actionText}
            </Header>
            <Form size='large' error>
                <Segment stacked>
                    {props.error.length > 0 &&
                    <Message
                        error
                        content={props.error}
                    />
                    }
                    <Dropdown
                        className='field'
                        fluid
                        placeholder='Company'
                        name='companyId'
                        value={props.order.companyId}
                        onChange={props.handleChange}
                        onSearchChange={props.searchCompanies}
                        search
                        selection
                        options={props.companies}
                    />
                    <Dropdown
                        className='field'
                        fluid
                        placeholder='Locality'
                        name='localityId'
                        value={props.order.localityId}
                        onChange={props.handleChange}
                        onSearchChange={props.searchLocalities}
                        search
                        selection
                        options={props.localities}
                    />
                    <Dropdown
                        className='field'
                        fluid
                        placeholder='Address'
                        name='addressId'
                        value={props.order.addressId}
                        onChange={props.handleChange}
                        onSearchChange={props.searchCompanyBranches}
                        onBlur={props.handleBlur}
                        search
                        selection
                        options={props.companyAddresses}
                    />
                    <Form.Input
                        fluid
                        placeholder='Description'
                        name='description'
                        value={props.order.description}
                        onChange={props.handleChange}
                    />

                    <Button color='teal' onClick={props.handleSubmit} fluid
                            size='large'>{props.actionText}</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
);

export default OrderForm;