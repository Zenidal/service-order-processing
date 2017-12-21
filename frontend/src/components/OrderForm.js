import React, {Component} from 'react';
import {Grid, Header, Segment, Message, Form, Button, Dropdown} from 'semantic-ui-react';

export default class OrderForm extends Component {
    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Column>
                    <Header as='h2' color='teal' textAlign='center'>
                        Order {this.props.actionText}
                    </Header>
                    <Form size='large' error>
                        <Segment stacked>
                            {this.props.order.error.length > 0 &&
                            <Message
                                error
                                content={this.props.order.error}
                            />
                            }
                            <Dropdown
                                className='field'
                                fluid
                                placeholder='Company'
                                name='companyId'
                                value={this.props.order.companyId}
                                onChange={this.props.handleChange}
                                onSearchChange={this.props.searchCompanies}
                                search
                                selection
                                options={this.props.companies}
                            />
                            <Dropdown
                                className='field'
                                fluid
                                placeholder='Locality'
                                name='localityId'
                                value={this.props.order.localityId}
                                onChange={this.props.handleChange}
                                onSearchChange={this.props.searchLocalities}
                                search
                                selection
                                options={this.props.localities}
                            />
                            <Dropdown
                                className='field'
                                fluid
                                placeholder='Address'
                                name='addressId'
                                value={this.props.order.addressId}
                                onChange={this.props.handleChange}
                                onSearchChange={this.props.searchCompanyBranches}
                                onBlur={this.props.handleBlur}
                                search
                                selection
                                options={this.props.companyAddresses}
                            />
                            <Form.Input
                                fluid
                                placeholder='Description'
                                name='description'
                                value={this.props.order.description}
                                onChange={this.props.handleChange}
                            />

                            <Button color='teal' onClick={this.props.handleSubmit} fluid
                                    size='large'>{this.props.actionText}</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
};