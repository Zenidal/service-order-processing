import React, {Component} from 'react';
import {Item, Container, Dimmer, Loader, Grid} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder, orderView, orderStatusHistoryView} from "../../constants/OrderHelper";

export default class ShowOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {},
            orderStatusHistories: []
        };
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId, function (response) {
            this.setState(() => {
                return {order: mapOrder(response.data.order)};
            });
        }.bind(this));
    }

    getStatusHistories() {
        this.orderService.getStatusHistories(this.state.orderId, function (response) {
            this.setState(() => {
                return {
                    orderStatusHistories: response.data.orderStatusHistories ? response.data.orderStatusHistories.map(function (orderStatusHistory) {
                        return {
                            id: orderStatusHistory.id,
                            orderId: orderStatusHistory.order_id,
                            userId: orderStatusHistory.user_id,
                            userName: orderStatusHistory.user.name,
                            fromStatus: orderStatusHistory.from_status,
                            toStatus: orderStatusHistory.to_status,
                            comment: orderStatusHistory.comment,
                            createdAt: orderStatusHistory.created_at
                        };
                    }) : []
                };
            });
        }.bind(this));
    }

    componentWillMount() {
        this.getOrder();
        this.getStatusHistories();
    }

    render() {
        let content = this.state.order.id ? orderView({order: this.state.order}) : '';

        let histories = this.state.orderStatusHistories ? this.state.orderStatusHistories.map(function (orderStatusHistory) {
            return orderStatusHistoryView({orderStatusHistory: orderStatusHistory});
        }) : '';

        return (
            <Container>
                {(!content || !histories) &&
                <Dimmer active inverted>
                    <Loader size='small'>Loading</Loader>
                </Dimmer>
                }

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Item.Group>
                                {content}
                            </Item.Group>
                            <Item.Group>
                                <Item>
                                    <Link to={ORDER_PATH}>Orders</Link>
                                </Item>
                                <Item>
                                    <Link to={makeUrl(ORDER_EDIT_PATH, {number: this.state.orderId})}>Edit</Link>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column className="fixed-grid-container">
                            <Item.Group divided>
                                {histories}
                            </Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}