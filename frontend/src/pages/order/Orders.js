import React, {Component} from 'react';
import {Table, Icon, Button, Menu, Container} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {ORDER_PATH} from "../../constants/RoutePaths";

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orders: []
        };
    }

    getOrders() {
        this.orderService.getAllOrders(function (response) {
            this.setState({
                orders: response.data.orders.map(function (order, index) {
                    return {
                        id: order.id,
                        description: order.description,
                        status: order.status,
                        companyName: order.company_branch.company.name,
                        countryName: order.company_branch.address.locality.country.name,
                        localityName: order.company_branch.address.locality.name,
                        exactAddress: order.company_branch.address.exact_address,
                        createdAt: order.created_at,
                        engineerName: order.engineer && order.engineer.name ? order.engineer.name : '',
                        ownerName: order.owner.name
                    };
                })
            });
        }.bind(this));
    }

    componentWillMount() {
        this.getOrders();
    }

    render() {
        let isLoaded = this.state.orders.length > 0;
        let columns = isLoaded ? this.state.orders.map(function (order) {
                return (
                    <Table.Row key={order.id}>
                        <Table.Cell>{order.id}</Table.Cell>
                        <Table.Cell>{order.description}</Table.Cell>
                        <Table.Cell>{order.status}</Table.Cell>
                        <Table.Cell>{order.companyName}</Table.Cell>
                        <Table.Cell>{order.countryName}</Table.Cell>
                        <Table.Cell>{order.localityName}</Table.Cell>
                        <Table.Cell>{order.exactAddress}</Table.Cell>
                        <Table.Cell>{order.createdAt}</Table.Cell>
                        <Table.Cell>{order.engineerName}</Table.Cell>
                        <Table.Cell>{order.ownerName}</Table.Cell>
                        <Table.Cell>
                            <Menu>
                                <Menu.Item as={Link} to={ORDER_PATH + '/' + order.id}>Show</Menu.Item>
                                <Menu.Item as={Link} to={ORDER_PATH + '/' + order.id + '/edit'}>Edit</Menu.Item>
                            </Menu>
                        </Table.Cell>
                    </Table.Row>
                );
            })
            : [];

        return (
            <Container>
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.HeaderCell>Country Name</Table.HeaderCell>
                            <Table.HeaderCell>Locality Name</Table.HeaderCell>
                            <Table.HeaderCell>Exact Address</Table.HeaderCell>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell>Engineer</Table.HeaderCell>
                            <Table.HeaderCell>Owner</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {columns}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Button icon labelPosition='left' primary size='small'>
                                    <Icon name='user'/> Add Order
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        );
    }
}