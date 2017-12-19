import React, {Component} from 'react';
import {Table, Icon, Button, Menu} from 'semantic-ui-react'
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
                    return order;
                })
            });
        }.bind(this));
    }

    componentWillMount() {
        this.getOrders();
    }

    render() {
        let columns = this.state.orders.map(function (order) {
            return (
                <Table.Row key={order.id}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.description}</Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>{order.company_branch.company.name}</Table.Cell>
                    <Table.Cell>{order.company_branch.address.locality.country.name}</Table.Cell>
                    <Table.Cell>{order.company_branch.address.locality.name}</Table.Cell>
                    <Table.Cell>{order.company_branch.address.exact_address}</Table.Cell>
                    <Table.Cell>{order.created_at}</Table.Cell>
                    <Table.Cell>{order.engineer.name}</Table.Cell>
                    <Table.Cell>{order.owner.name}</Table.Cell>
                    <Table.Cell>
                        <Menu>
                            <Menu.Item as={Link} to={ORDER_PATH + '/' + order.id}>Show</Menu.Item>
                            <Menu.Item as={Link} to={ORDER_PATH + '/' + order.id + '/edit'}>Edit</Menu.Item>
                        </Menu>
                    </Table.Cell>
                </Table.Row>
            );
        }.bind(this));

        return (
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
        );
    }
}