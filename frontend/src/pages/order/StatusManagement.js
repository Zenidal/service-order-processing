import React, {Component} from 'react';
import {Container, Grid, Item} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {mapOrder} from "../../constants/OrderHelper";
import OrderView from "../../constants/OrderView";
import OrderStatuses from '../../components/OrderStatuses';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH, ORDER_SHOW_PATH} from "../../constants/RoutePaths";
import {Link} from "react-router-dom";
import ErrorView from "../../constants/ErrorView";

export default class StatusManagementOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {},
            formData: {},
            engineers: [],
            error: ''
        };

        this.handleError = this.handleError.bind(this);
        this.assignOrder = this.assignOrder.bind(this);
        this.startProgressOrder = this.startProgressOrder.bind(this);
        this.resolveOrder = this.resolveOrder.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
        this.reopenOrder = this.reopenOrder.bind(this);
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId,
            function (response) {
                this.setState(() => {
                    let mappedOrder = mapOrder(response.data.order);
                    let engineers = mappedOrder.engineerId ? [
                        {
                            key: mappedOrder.engineerId,
                            value: mappedOrder.engineerId,
                            text: mappedOrder.engineerName
                        }
                    ] : [];
                    return {order: mappedOrder, engineers: engineers};
                });
            }.bind(this), this.handleError);

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

    assignOrder(engineerId, callback, comment) {
        this.orderService.assign(
            this.state.order,
            engineerId,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }
        );
    }

    startProgressOrder(callback, comment) {
        this.orderService.startProgress(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }
        );
    }

    resolveOrder(callback, comment) {
        this.orderService.resolve(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }
        );
    }

    closeOrder(callback, comment) {
        this.orderService.close(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }
        );
    }

    reopenOrder(callback, comment) {
        this.orderService.reopen(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }
        );
    }

    componentDidMount() {
        this.getOrder();
    }

    render() {
        let view = (props) => {
            return !props.error ? (
                <Container>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Item.Group>
                                    <Item>
                                        <OrderStatuses
                                            engineerId={props.order.engineerId}
                                            engineers={props.engineers}
                                            order={props.order}
                                            assignOrder={props.assignOrder}
                                            startProgressOrder={props.startProgressOrder}
                                            resolveOrder={props.resolveOrder}
                                            closeOrder={props.closeOrder}
                                            reopenOrder={props.reopenOrder}
                                        />
                                    </Item>
                                    <OrderView order={props.order}/>
                                </Item.Group>
                                <Item.Group>
                                    <Item>
                                        <Link to={ORDER_PATH}>Orders</Link>
                                    </Item>
                                    <Item>
                                        <Link to={makeUrl(ORDER_EDIT_PATH, {number: props.order.id})}>Edit</Link>
                                    </Item>
                                    <Item>
                                        <Link to={makeUrl(ORDER_SHOW_PATH, {number: props.order.id})}>Show</Link>
                                    </Item>
                                </Item.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            ) : (<ErrorView error={props.error}/>);
        };

        return view({
            order: this.state.order,
            engineers: this.state.engineers,
            error: this.state.error,
            assignOrder: this.assignOrder,
            startProgressOrder: this.startProgressOrder,
            resolveOrder: this.resolveOrder,
            closeOrder: this.closeOrder,
            reopenOrder: this.reopenOrder,
        });
    }
}