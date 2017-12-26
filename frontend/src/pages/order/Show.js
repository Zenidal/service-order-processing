import React, {Component} from 'react';
import {Item, Container, Dimmer, Loader} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder, order} from "../../constants/OrderHelper";

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
        let content = this.state.order.id ? order({order: this.state.order}) : (
            <Dimmer active inverted>
                <Loader size='small'>Loading</Loader>
            </Dimmer>
        );

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