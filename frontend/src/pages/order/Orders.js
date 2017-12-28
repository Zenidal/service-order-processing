import React, {Component} from 'react';
import {Table, Menu, Container, Dimmer, Loader} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {
    makeUrl, ORDER_EDIT_PATH, ORDER_NEW_PATH, ORDER_SHOW_PATH,
    ORDER_STATUS_MANAGEMENT_PATH
} from "../../constants/RoutePaths";

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

    componentDidMount() {
        this.getOrders();
    }

    render() {
        let columns = this.state.orders.map(function (order) {
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
                            <Menu vertical>
                                <Menu.Item as={Link} to={makeUrl(ORDER_SHOW_PATH, {number: order.id})}>Show</Menu.Item>
                                <Menu.Item as={Link} to={makeUrl(ORDER_EDIT_PATH, {number: order.id})}>Edit</Menu.Item>
                                <Menu.Item as={Link} to={makeUrl(ORDER_STATUS_MANAGEMENT_PATH, {number: order.id})}>Status
                                    management</Menu.Item>
                            </Menu>
                        </Table.Cell>
                    </Table.Row>
                );
            });

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
                            <Table.HeaderCell colSpan={11}>
                                <Link to={ORDER_NEW_PATH}>New order</Link>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        );
    }
}