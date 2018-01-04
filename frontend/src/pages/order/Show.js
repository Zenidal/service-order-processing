import React, {Component} from 'react';
import {Item, Container, Grid} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder} from "../../constants/OrderHelper";
import OrderView from '../../constants/OrderView';
import OrderStatusHistoryView from '../../constants/OrderStatusHistoryView';
import NotificationSystem from 'react-notification-system';
import ErrorView from "../../constants/ErrorView";

export default class ShowOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();
        this.notificationSystem = null;

        this.state = {
            orderId: props.match.params.number,
            order: {},
            orderStatusHistories: [],
            error: ''
        };

        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
        this.getOrder();
        this.getStatusHistories();
    }

    handleError(error) {
        if (error.response) {
            let message;
            switch (error.response.status) {
                case 403:
                    message = 'Forbidden.';
                    break;
                case 404:
                    message = 'Not found.';
                    break;
                default:
                    message = '';
            }
            this.setState({error: {message: message}});
        }
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId,
            function (response) {
                this.setState(() => {
                    return {order: mapOrder(response.data.order)};
                });
            }.bind(this), this.handleError);
    }

    getStatusHistories() {
        this.orderService.getStatusHistories(this.state.orderId,
            function (response) {
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
            }.bind(this), this.handleError);
    }

    render() {
        let orderView = this.state.order.id ? <OrderView order={this.state.order}/> : '';

        let historiesView = this.state.orderStatusHistories ? this.state.orderStatusHistories.map(function (orderStatusHistory) {
            return <OrderStatusHistoryView key={orderStatusHistory.id} orderStatusHistory={orderStatusHistory}/>;
        }) : '';

        let view = (props) => {
            return this.state.order.id ? (
                <Container>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Item.Group>
                                    {props.orderView}
                                </Item.Group>
                                <Item.Group>
                                    <Item>
                                        <Link to={ORDER_PATH}>Orders</Link>
                                    </Item>
                                    <Item>
                                        <Link to={makeUrl(ORDER_EDIT_PATH, {number: props.orderId})}>Edit</Link>
                                    </Item>
                                </Item.Group>
                            </Grid.Column>
                            <Grid.Column className="fixed-grid-container">
                                <Item.Group divided>
                                    {props.historiesView}
                                </Item.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <NotificationSystem ref="notificationSystem"/>
                </Container>
            ) : (<ErrorView error={props.error}/>)
        };

        return view({orderView: orderView, historiesView: historiesView, error: this.state.error, orderId: this.state.orderId});
    }
}