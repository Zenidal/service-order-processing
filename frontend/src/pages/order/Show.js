import React, {Component} from 'react';
import {Item, Container, Tab} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {ORDER_PATH} from "../../constants/RoutePaths";
import {Redirect} from 'react-router';

export default class ShowOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {}
        };
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId, function (response) {
            this.setState({order: response.data.order});
        }.bind(this));
    }

    componentWillMount() {
        this.getOrder();
    }

    render() {
        let content = this.state.order.id ? (
            <Item.Content>
                <Item.Header>Id: {this.state.order.id}</Item.Header>
                <Item.Meta>
                    {this.state.order.created_at}
                </Item.Meta>
                <Item.Description>{this.state.order.description}</Item.Description>
                <Item.Description>
                    <span>{this.state.order.company_branch.company.name}</span>,
                    <span> {this.state.order.company_branch.address.locality.country.name}</span>,
                    <span> {this.state.order.company_branch.address.locality.name}</span>,
                    <span> {this.state.order.company_branch.address.exact_address}</span>
                </Item.Description>
                <Item.Extra>Status: {this.state.order.status}</Item.Extra>
                <Item.Extra>Owner: {this.state.order.owner.name}</Item.Extra>
                <Item.Extra>Engineer: {this.state.order.engineer.name}</Item.Extra>
            </Item.Content>
        ) : <Item.Content>'Loading'</Item.Content>;

        return (
            <Container>
                <Item.Group>
                    <Item>
                        {content}
                    </Item>
                    <Item>
                        <Link to={ORDER_PATH}>Orders</Link>
                    </Item>
                    <Item>
                        <Link to={ORDER_PATH + '/' + this.state.orderId + '/edit'}>Edit</Link>
                    </Item>
                </Item.Group>
            </Container>
        );
    }
}