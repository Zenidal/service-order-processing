import React, {Component} from 'react';
import {Item, Container} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder} from "../../constants/OrderHelper";

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
            this.setState(()=> {
                return {order: mapOrder(response.data.order)};
            });
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
                    {this.state.order.createdAt}
                </Item.Meta>
                <Item.Description>{this.state.order.description}</Item.Description>
                <Item.Description>
                    <span>{this.state.order.companyName}</span>,
                    <span> {this.state.order.countryName}</span>,
                    <span> {this.state.order.localityName}</span>,
                    <span> {this.state.order.exactAddress}</span>
                </Item.Description>
                <Item.Extra>Status: {this.state.order.status}</Item.Extra>
                <Item.Extra>Owner: {this.state.order.ownerName}</Item.Extra>
                <Item.Extra>Engineer: {this.state.order.engineerName}</Item.Extra>
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
                        <Link to={makeUrl(ORDER_EDIT_PATH, {number: this.state.orderId})}>Edit</Link>
                    </Item>
                </Item.Group>
            </Container>
        );
    }
}