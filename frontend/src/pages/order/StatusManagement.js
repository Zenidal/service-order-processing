import React, {Component} from 'react';
import {Container, Grid, Item} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {mapOrder} from "../../constants/OrderHelper";
import OrderView from "../../constants/OrderView";
import OrderStatuses from '../../components/OrderStatuses';
import {makeUrl, ORDER_EDIT_PATH, ORDER_PATH, ORDER_SHOW_PATH} from "../../constants/RoutePaths";
import {Link} from "react-router-dom";

export default class StatusManagementOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {},
            formData: {},
            engineers: []
        };

        this.assignOrder = this.assignOrder.bind(this);
        this.startProgressOrder = this.startProgressOrder.bind(this);
        this.resolveOrder = this.resolveOrder.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
        this.reopenOrder = this.reopenOrder.bind(this);
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId, function (response) {
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
        }.bind(this));

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
        return (
            <Container>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Item.Group>
                                <Item>
                                    <OrderStatuses
                                        engineerId={this.state.order.engineerId}
                                        engineers={this.state.engineers}
                                        order={this.state.order}
                                        assignOrder={this.assignOrder}
                                        startProgressOrder={this.startProgressOrder}
                                        resolveOrder={this.resolveOrder}
                                        closeOrder={this.closeOrder}
                                        reopenOrder={this.reopenOrder}
                                    />
                                </Item>
                                <OrderView order={this.state.order}/>
                            </Item.Group>
                            <Item.Group>
                                <Item>
                                    <Link to={ORDER_PATH}>Orders</Link>
                                </Item>
                                <Item>
                                    <Link to={makeUrl(ORDER_EDIT_PATH, {number: this.state.orderId})}>Edit</Link>
                                </Item>
                                <Item>
                                    <Link to={makeUrl(ORDER_SHOW_PATH, {number: this.state.orderId})}>Show</Link>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}