import React, {Component} from 'react';
import {Item, Container, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {
    makeUrl, ORDER_EDIT_PATH, ORDER_PATH,
    ORDER_STATUS_MANAGEMENT_PATH
} from "../../constants/RoutePaths";
import {mapOrder, mapOrderStatusHistory} from "../../constants/Mapper";
import OrderView from '../../constants/OrderView';
import OrderStatusHistoryView from '../../constants/OrderStatusHistoryView';
import NotificationSystem from 'react-notification-system';
import ErrorView from "../../constants/ErrorView";
import ServiceContainer from "../../components/ServiceContainer";

export default class ShowOrder extends Component {
    constructor(props) {
        super(props);

        this.serviceContainer = null;

        this.state = {
            orderId: props.match.params.number,
            order: {},
            orderStatusHistories: [],
            error: ''
        };

        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.serviceContainer = this.refs.serviceContainer;
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
        this.serviceContainer.orderService.getOrder(this.state.orderId,
            function (response) {
                this.setState(() => {
                    return {order: mapOrder(response.data.order)};
                });
            }.bind(this), this.handleError);
    }

    getStatusHistories() {
        this.serviceContainer.orderService.getStatusHistories(this.state.orderId,
            function (response) {
                this.setState(() => {
                    return {
                        orderStatusHistories: response.data.orderStatusHistories ? response.data.orderStatusHistories.map(function (orderStatusHistory) {
                            return mapOrderStatusHistory(orderStatusHistory);
                        }) : []
                    };
                });
            }.bind(this), this.handleError);
    }

    render() {
        let orderView = this.state.order.id ? <OrderView order={this.state.order}/> : '';

        let historiesView = this.state.orderStatusHistories.length > 0 ? this.state.orderStatusHistories.map(function (orderStatusHistory) {
            return <OrderStatusHistoryView key={orderStatusHistory.id} orderStatusHistory={orderStatusHistory}/>;
        }) : 'Status history is empty.';

        let view = (props) => {
            return !props.error ? (
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
                                        <Link to={makeUrl(ORDER_STATUS_MANAGEMENT_PATH, {number: props.orderId})}>
                                            Status management
                                        </Link>
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
                    <ServiceContainer ref="serviceContainer"/>
                </Container>
            ) : (<ErrorView error={props.error}/>)
        };

        return view({
            orderView: orderView,
            historiesView: historiesView,
            error: this.state.error,
            orderId: this.state.orderId
        });
    }
}